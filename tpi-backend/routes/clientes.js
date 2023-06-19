const express = require('express');
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize")
const auth = require("../seguridad/auth");

router.get("/api/clientes", async function (req, res, next) {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };
    }
    if (req.query.Activo != undefined && req.query.Activo !== "") {
      where.Activo = req.query.Activo === "true";
    }  
    const { count, rows } = await db.clientes.findAndCountAll({
      attributes: [
        "Idcliente",
        "Nombre",
        "FechaNacimiento",
        "Telefono",
        "CorreoElectronico",
        "Activo",
      ],
      order: [["Nombre", "ASC"]],
      where
    });
  
    return res.json({ Items: rows, RegistrosTotal: count });
  });

  router.get("/api/clientes/:id", async function (req, res, next) {
    let data = await db.clientes.findAll({
      attributes: [
        "Idcliente",
        "Nombre",
        "FechaNacimiento",
        "Telefono",
        "CorreoElectronico",
        "Activo",
      ],
      where: { Idcliente: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
  });

  router.post("/api/clientes/", async (req, res) => {
    try {
      let data = await db.clientes.create({
        Idcliente: req.body.Idcliente,
        Nombre: req.body.Nombre,
        FechaNacimiento: req.body.FechaNacimiento,
        Telefono: req.body.Telefono,
        CorreoElectronico: req.body.CorreoElectronico,
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

  router.put("/api/clientes/:id", async (req, res) => {
    try {
      let item = await db.clientes.findOne({
        attributes: [
          "Idcliente",
          "Nombre",
          "FechaNacimiento",
          "Telefono",
          "CorreoElectronico",
          "Activo",
        ],
        where: { Idcliente: req.params.id },
      });
      if (!item) {
        res.status(404).json({ message: "Cliente no encontrada" });
        return;
      }
      item.Idcliente = req.body.Idcliente,
      item.Nombre = req.body.Nombre,
      item.FechaNacimiento = req.body.FechaNacimiento,
      item.Telefono = req.body.Telefono,
      item.CorreoElectronic = req.body.CorreoElectronico,
      item.Activo = req.body.Activo
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

  router.delete("/api/clientes/:id", async (req, res) => {

    let bajaFisica = false;
  
    if (bajaFisica) {
      // baja fisica
      let filasBorradas = await db.clientes.destroy({
        where: { Idcliente: req.params.id},
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      // baja logica
      try {
        let data = await db.sequelize.query(
          "UPDATE clientes SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdCliente = :IdCliente",
          {
            replacements: { IdCliente: +req.params.id },
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

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
  router.get(
    "/api/jwt/clientes",
    auth.authenticateJWT,
    async function (req, res, next) {
      
      const { rol } = res.locals.user;
      if (rol !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }

      let items = await db.clientes.findAll({
        attributes: [
          "Idcliente",
          "Nombre",
          "FechaNacimiento",
          "Telefono",
          "CorreoElectronico",
          "Activo",
        ],
        order: [["Nombre", "ASC"]],
      });
      res.json(items);
    }
  );

module.exports = router;