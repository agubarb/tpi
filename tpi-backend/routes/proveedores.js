const { Sequelize, DataTypes, ValidationError } = require('sequelize');
const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/proveedores", async function (req, res, next) {
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  if (req.query.Activo != undefined && req.query.Activo !== "") {
    where.Activo = req.query.Activo === "true";
  }

  let data = await db.proveedores.findAll({
    attributes: [
      "IdProveedores",
      "Nombre",
      "Email",
      "FechaAlta",
      "Telefono",
      "Activo"       
    ],
  });

  return res.json(data);
});


router.get("/api/proveedores/:id", async function (req, res, next) {
  let data = await db.proveedores.findAll({
    attributes: ["IdProveedores", "Nombre","Email","FechaAlta","Telefono","Activo"],
    where: { IdProveedores: req.params.id },
  });
  if (data.length > 0 ) res.json(data[0]);
  else res.status(404).json({mensaje:'No econtrado!!'})
});

router.post("/api/proveedores/", async (req, res) => {
  try {
    let data = await db.proveedores.create({
      Nombre: req.body.Nombre,
      Email: req.body.Email,
      FechaAlta: req.body.FechaAlta,
      Telefono: req.body.Telefono,
      Activo: req.body.Activo
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

router.put("/api/proveedores/:id", async (req, res) => {
  try {
    let item = await db.proveedores.findOne({
      attributes: [
        "IdProveedores",
        "Nombre",
        "Email",
        "FechaAlta",
        "Telefono",
        "Activo" 
      ],
      where: { IdProveedores: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Proveedor no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Email = req.body.Email;
    item.FechaAlta = req.body.FechaAlta;
    item.Telefono = req.body.Telefono;
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

router.delete("/api/proveedores/:id", async (req, res) => {

  let bajaFisica = true;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.proveedores.destroy({
      where: { IdProveedores: req.params.id},
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja logica
    try {
      let data = await db.sequelize.query(
        "UPDATE proveedores SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdProveedores = :IdProveedores",
        {
          replacements: { IdProveedores: +req.params.id },
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

module.exports = router;
