// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/tienda.db");

// definicion del modelo de datos
const prendas = sequelize.define(
    "prendas",
  {
    IdPrenda: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
    },
    unique: {
      args: true,
      msg: "este Nombre ya existe en la tabla!",
    },
    },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Precio es requerido",
          }
        }
    },
    FechaAlta: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fecha Alta es requerido",
          }
        }
      },
      Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Activo es requerido",
          }
        }
      },
    },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (prenda, options) {
        if (typeof prenda.Nombre === "string") {
          prenda.Nombre = prenda.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

const empleados = sequelize.define(
  "empleados",
{
  IdEmpleado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Nombre es requerido",
      },
  },
  unique: {
    args: true,
    msg: "este Nombre ya existe en la tabla!",
  },
  },
  Salario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Salario es requerido",
        }
      }
  },
  FechaAlta: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha Alta es requerido",
        }
      }
    },
},
{
  // pasar a mayusculas
  hooks: {
    beforeValidate: function (empleado, options) {
      if (typeof empleado.Nombre === "string") {
        empleado.Nombre = empleado.Nombre.toUpperCase().trim();
      }
    },
  },

  timestamps: false,
}
);

const proveedores = sequelize.define("proveedores", {
  IdProveedores: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Nombre es requerido",
      },
    },
  },
  Email: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Email es requerido",
      },
    },
  },
  FechaAlta: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "Fecha Alta es requerido",
      },
    },
  },
  Telefono: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "Telefono es requerido",
      },
    },
  },
  Activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "Activo es requerido",
      },
    },
  },
}, {
  timestamps: false,
  unique: {
    fields: ['Nombre'],
    msg: "Este Nombre ya existe en la tabla!",
  },
});

const clientes = sequelize.define(
  "clientes",
{
  Idcliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Nombre es requerido",
      },
    },
    unique: {
      args: true,
      msg: "este Nombre ya existe en la tabla!",
    },
  },
  FechaNacimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha Nacimiento es requerida",
        }
      }
  },
  Telefono: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      validate: {
          notNull: {
              args: true,
              msg: "El Telefono es requerido",
          },
          is: {
              args: ["^[0-9]{10}$", "i"],
              msg: "El Telefono debe ser numerico de 10 digitos",
          },
      },
  },
  CorreoElectronico: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
          notEmpty: {
          args: true,
          msg: "El Correo Electronico es requerido",
          },
      },
  },
  Activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "Activo es requerido",
      }
    }
  },
},

{
  // pasar a mayusculas
  hooks: {
    beforeValidate: function (cliente, options) {
      if (typeof cliente.Nombre === "string") {
        cliente.Nombre = cliente.Nombre.toUpperCase().trim();
      }
    },
  },

  timestamps: false,
}
);

module.exports = {
    sequelize,
    prendas,
    empleados,
    proveedores, 
    clientes
  };

