const request = require("supertest");
const app = require("../index");
const empleadoAlta = {
  Nombre: "Empleado " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Salario: 100.00,
  FechaAlta: new Date().toISOString(),
};
const empleadoModificacion = {
  IdEmpleado: 1,
  Nombre: "Empleado " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Salario: 100.00,
  FechaAlta: new Date().toISOString(),
};


// test route/articulos GET
describe("GET /api/empleados", () => {
  it("Deberia devolver todos los empleados", async () => {
  const res = await request(app).get("/api/empleados");
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual(
  expect.objectContaining({
  Items:
  expect.arrayContaining([
  expect.objectContaining({
  IdEmpleado: expect.any(Number),
  Nombre: expect.any(String),
  Salario: expect.any(Number),
  FechaAlta: expect.any(String),
  })
  ]),
  RegistrosTotal: expect.any(Number)
  })
  );
  });
  });

// test route/empleados/:id GET
describe("GET /api/empleados/:id", () => {
  it("Deberia devolver el empleado con el id 1", async () => {
    const res = await request(app).get("/api/empleados/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdEmpleado: expect.any(Number),
        Nombre: expect.any(String),
        Salario: expect.any(Number),
        FechaAlta: expect.any(String),
      })
    );
  });
});

// test route/articulos POST
describe("POST /api/empleados", () => {
  it("Deberia devolver el empleado que acabo de crear", async () => {
    const res = await request(app).post("/api/empleados").send(empleadoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdEmpleado: expect.any(Number),
        Nombre: expect.any(String),
        Salario: expect.any(Number),
        FechaAlta: expect.any(String),
      })
    );
  });
});

// test route/empleados/:id PUT
describe("PUT /api/empleados/:id", () => {
  it("Deberia devolver el empleado con el id 1 modificado", async () => {
    const res = await request(app).put("/api/empleados/1").send(empleadoModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/articulos/:id DELETE
describe("DELETE /api/empleados/:id", () => {
  it("Deberia devolver el empleado con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/empleados/1");
    expect(res.statusCode).toEqual(200);
    
    // baja logica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     IdArticulo: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );

  });
});
