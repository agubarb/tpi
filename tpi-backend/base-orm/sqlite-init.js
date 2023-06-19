// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/tienda.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'prendas'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table prendas( 
              IdPrenda INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , Precio real
            , FechaAlta text
            , Activo boolean
            );`
    );
    console.log("tabla prendas creada!");

    await db.run(
        `insert into prendas values
        (1, 'Remera Puma Rudagon De Hombre', 19.99, '2017-05-31',1),
        (2, 'Remera adidas Own The Run De Hombre', 29.99, '2017-05-30',1),
        (3, 'Remera De Ciclismo adidas Jersey De Hombre', 39.99, '2017-05-29',1),
        (4, 'Campera Puma Essentials Small Logo De Hombre', 49.99, '2017-05-28',1),
        (5, 'Campera Puma Mercedes-AMG Motorsport De Hombre', 59.99, '2017-05-27',1),
        (6, 'Campera Montagne Kilian De Mujer', 69.99, '2017-05-26',1),
        (7, 'Buzo Fila Arthur De Hombre', 24.99, '2017-05-25',1),
        (8, 'Buzo Under Armour Rival Terry De Hombre', 34.99, '2017-05-24',1),
        (9, 'Calza Puma Eversculpt De Mujer', 39.99, '2017-05-23',1),
        (10, 'Calza Reebok Lux High Rise De Mujer', 89.99, '2017-05-22',1)
        ;`
    );
    }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'empleados'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table empleados( 
          IdEmpleado INTEGER PRIMARY KEY AUTOINCREMENT
        , Nombre text NOT NULL UNIQUE
        , Salario real
        , FechaAlta text
        );`
    );
    console.log("tabla empleados creada!");
    await db.run(
      `insert into empleados values
      (1, 'Enrique', 100.00, '2014-03-31'),
      (2, 'Alex', 100.00, '2014-03-30'),
      (3, 'Eugenia', 100.00, '2014-03-29'),
      (4, 'Raquel', 99.99, '2015-07-28'),
      (5, 'Julián', 99.99, '2015-07-27'),
      (6, 'Fernanda', 150.00, '2015-07-26'),
      (7, 'Andrea', 150.00, '2016-08-25'),
      (8, 'Graciela', 150.00, '2016-08-24'),
      (9, 'Emanuel', 150.00, '2016-08-23'),
      (10, 'Rocío', 150.00, '2017-10-22')
      ;`
    )
  }

  existe = false;

  const sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'proveedores'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE proveedores (
        IdProveedores INTEGER PRIMARY KEY,
        Nombre TEXT NOT NULL UNIQUE,
        Email TEXT NOT NULL UNIQUE,
        FechaAlta TEXT,
        Telefono INTEGER,
        Activo BOOLEAN
      );`
    );
    console.log("Tabla proveedores creada!");

    const insertRecordsQuery = `
      INSERT INTO proveedores (IdProveedores, Nombre, Email, FechaAlta, Telefono, Activo)
      VALUES
        (1, 'Juan Ramirez SRL', 'proveedor1@mail.com', '2017-01-19', 1111, 1),
        (2, 'Pedro Perez SA', 'proveedor2@mail.com', '2017-03-03', 2222, 1),
        (3, 'NIKE', 'proveedor3@mail.com', '2017-03-29', 3333 ,1),
        (4, 'ADIDAS', 'proveedor4@mail.com', '2017-07-20', 4444 ,1),
        (5, 'Proveedor 5', 'proveedor5@mail.com', '2017-09-01', 5555 ,1),
        (6, 'Proveedor 6', 'proveedor6@mail.com', '2018-01-06', 6666 ,1),
        (7, 'Proveedor 7', 'proveedor7@mail.com', '2018-04-13', 7777 ,1),
        (8, 'Proveedor 8', 'proveedor8@mail.com', '2018-08-27', 8888 ,1),
        (9, 'Proveedor 9', 'proveedor9@mail.com', '2019-05-16', 9999 ,1),
        (10, 'Proveedor 10', 'proveedor10@mail.com', '2019-06-01', 1010, 1)`;

    await db.run(insertRecordsQuery);
    console.log("Registros insertados en la tabla proveedores.");
  }

  existe = false


  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'clientes'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table clientes( 
              Idcliente INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , FechaNacimiento text NOT NULL
            , Telefono INTEGER NOT NULL
            , CorreoElectronico text NOT NULL
            , Activo boolean
            );`
    );
    console.log("tabla clientes creada!");

    await db.run(
        `insert into clientes values
        (1, 'Pablo Gimenez', '1999-02-12', 3834251614, 'PabloG@hotmail.com', 1),
        (2, 'Flavia Romero', '1972-06-02', 3834884975, 'FlaviaR@gmail.com', 1),
        (3, 'Valentina Perez', '2002-05-18', 3834516967, 'ValentinaP@hotmail.com', 1),
        (4, 'Lucia Ferrero', '2000-10-06', 3834781511, 'LuciaF@hotmail.com', 1),
        (5, 'Lucas Diaz', '2001-08-21', 4513579526, 'LucasD@hotmail.com', 1),
        (6, 'Tomas Gonzales', '1980-05-12', 4512364581, 'TomasG@gmail.com', 1),
        (7, 'Julia Mazza', '2002-09-24', 4586987123, 'JuliaM@hotmail.com', 1),
        (8, 'Camila Rodriguez', '2004-04-04', 4563214598, 'CamilaR@gmail.com', 1),
        (9, 'Federico Acosta', '1990-05-20', 2654315698, 'FedericoA@hotmail.com', 1),
        (10, 'Ana Carrizo', '2002-01-12', 2658974316, 'AnaC@hotmail.com', 1)
        ;`
    );
    }


  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
