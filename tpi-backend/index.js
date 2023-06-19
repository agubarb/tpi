const express = require("express");
require("./base-orm/sqlite-init");  // crear base si no existe

// crear servidor
const app = express();
const cors = require('cors');

app.use(express.json()); // para poder leer json en el body
app.use(cors());

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial TPI!");
});

const prendasRouter = require("./routes/prendas");
app.use(prendasRouter);

const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter)

const empleadosRouter = require("./routes/empleados");
app.use(empleadosRouter);

const proveedoresRouter = require("./routes/proveedores");
app.use(proveedoresRouter);

const clientesRouter = require("./routes/clientes");
app.use(clientesRouter);

if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000;   // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app; // para testing
