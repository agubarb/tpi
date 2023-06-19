const request = require("supertest");
const app = require("../index");
const clienteAlta = {
  Nombre: "cliente " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  FechaNacimiento: new Date().toISOString(),
  Telefono: 3834251546,
  CorreoElectronico: '@hotmail.com',
  Activo: true,
};
const clienteModificacion = {
  Nombre: "cliente " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  FechaNacimiento: new Date().toISOString(),
  Telefono: 3834251546,
  CorreoElectronico: '@hotmail.com',
  Activo: true,
};


// test route/clientes GET
describe("GET /api/clientes", () => {
  it("Deberia devolver todos los clientes", async () => {
    const res = await request(app).get("/api/clientes");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
     expect.objectContaining({
      Items: 
      expect.arrayContaining([
        expect.objectContaining({
          Idcliente: expect.any(Number),
          Nombre: expect.any(String),
          FechaNacimiento: expect.any(String),
          Telefono: expect.any(Number),
          CorreoElectronico: expect.any(String),
          Activo: expect.any(Boolean),
        })
      ]),
      RegistrosTotal:  expect.any(Number) 
     })
    );
  });
});

// test route/clientes/:id GET
describe("GET /api/clientes/:id", () => {
  it("Deberia devolver el cliente con el id 1", async () => {
    const res = await request(app).get("/api/clientes/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Idcliente: expect.any(Number),
        Nombre: expect.any(String),
        FechaNacimiento: expect.any(String),
        Telefono: expect.any(Number),
        CorreoElectronico: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route/clientes POST
describe("POST /api/clientes", () => {
  it("Deberia devolver el cliente que acabo de crear", async () => {
    const res = await request(app).post("/api/clientes").send(clienteAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Idcliente: expect.any(Number),
        Nombre: expect.any(String),
        FechaNacimiento: expect.any(String),
        Telefono: expect.any(Number),
        CorreoElectronico: expect.any(String),
        Activo: expect.any(Boolean)
      })
    );
  });
});

// test route/clientes/:id PUT
describe("PUT /api/clientes/:id", () => {
  it("Deberia devolver el cliente con el id 1 modificado", async () => {
    const res = await request(app).put("/api/clientes/1").send(clienteModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/clientes/:id DELETE
describe("DELETE /api/clientes/:id", () => {
  it("Deberia devolver el cliente con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/clientes/1");
    expect(res.statusCode).toEqual(200);

  });
});