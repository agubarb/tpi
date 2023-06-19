const express = require('express');
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/empleados", async function (req, res, next) {
 
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  const { count, rows } = await db.empleados.findAndCountAll({
    attributes: [
      "IdEmpleado",
      "Nombre",
      "Salario",
      "FechaAlta",
    ],
    order: [["Nombre", "ASC"]],
    where
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});



router.get("/api/empleados/:id", async function (req, res, next) {
  let data = await db.empleados.findAll({
    attributes: ["IdEmpleado", "Nombre","Salario","FechaAlta"],
    where: { IdEmpleado: req.params.id },
  });
  if (data.length > 0 ) res.json(data[0]);
  else res.status(404).json({mensaje:'No encontrado!!'})
});

router.post("/api/empleados/", async (req, res) => {
  try {
    let data = await db.empleados.create({
      Nombre: req.body.Nombre,
      Salario: req.body.Salario,
      FechaAlta: req.body.FechaAlta,

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

router.put("/api/empleados/:id", async (req, res) => {
  try {
    let item = await db.empleados.findOne({
      attributes: [
        "IdEmpleado",
        "Nombre",
        "Salario",
        "FechaAlta",
      ],
      where: { IdEmpleado: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Empleado no encontrado" });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Salario = req.body.Salario;
    item.FechaAlta = req.body.FechaAlta;
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

router.delete("/api/empleados/:id", async (req, res) => {

  let bajaFisica = true;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.empleados.destroy({
      where: { IdEmpleado: req.params.id},
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } 
});

module.exports = router;
