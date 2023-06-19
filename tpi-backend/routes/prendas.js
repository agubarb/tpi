const express = require('express');
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const auth = require("../seguridad/auth");
const { Op, ValidationError } = require("sequelize");

router.get("/api/prendas", async function (req, res, next) {

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  if (req.query.Activo != undefined && req.query.Activo !== "") {
    where.Activo = req.query.Activo === "true";
  }
  const { count, rows } = await db.prendas.findAndCountAll({
    attributes: [
      "IdPrenda",
      "Nombre",
      "Precio",
      "FechaAlta",
      "Activo",
    ],
    order: [["Nombre", "ASC"]],
    where
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

/*
router.get("/api/prendas", async function (req, res, next) {
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  if (req.query.Activo != undefined && req.query.Activo !== "") {
    where.Activo = req.query.Activo === "true";
  }
  const { count, rows } = await db.articulos.findAndCountAll({
    
    attributes: [
      "IdPrenda",
      "Nombre",
      "Precio",
      "FechaAlta",
      "Activo",
    ],
    order: [["Nombre", "ASC"]],
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

*/
router.get("/api/prendas/:id", async function (req, res, next) {
  let data = await db.prendas.findAll({
    attributes: ["IdPrenda", "Nombre","Precio","FechaAlta","Activo"],
    where: { IdPrenda: req.params.id },
  });
  if (data.length > 0 ) res.json(data[0]);
  else res.status(404).json({mensaje:'No econtrado!!'})
});

router.post("/api/prendas/", async (req, res) => {
  try {
    let data = await db.prendas.create({
      Nombre: req.body.Nombre,
      Precio: req.body.Precio,
      FechaAlta: req.body.FechaAlta,
      Activo: req.body.Activo,

    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("/api/prendas/:id", async (req, res) => {
  try {
    let item = await db.prendas.findOne({
      attributes: [
        "IdPrenda",
        "Nombre",
        "Precio",
        "FechaAlta",
        "Activo"
      ],
      where: { IdPrenda: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Prenda no encontrada" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Precio = req.body.Precio;
    item.FechaAlta = req.body.FechaAlta;
    item.Activo = req.body.Activo;
    await item.save();
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete("/api/prendas/:id", async (req, res) => {

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.prendas.destroy({
      where: { IdPrenda: req.params.id},
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja logica
    try {
      let data = await db.sequelize.query(
        "UPDATE prendas SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdPrenda = :IdPrenda",
        {
          replacements: { IdPrenda: +req.params.id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});

router.get(
  "/api/jwt/prendas",
  auth.authenticateJWT,
  async function (req, res, next) {

    const { rol } = res.locals.user;
    if (rol !== "Administrador") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.prendas.findAll({
      attributes: [
        "IdPrenda",
        "Nombre",
        "Precio",
        "FechaAlta",
        "Activo",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
);

module.exports = router;
