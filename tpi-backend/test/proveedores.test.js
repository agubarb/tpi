const request = require("supertest");
const app = require("../index");

const proveedorAlta = {
  IdProveedores: 11,
  Nombre: "Proveedor " + Math.random().toString(36).substring(2),
  Email: "proveedor@example.com",
  FechaAlta: new Date().toISOString(),
  Telefono: 123123123,
  Activo: true
};

const proveedorModificacion = {
  IdProveedores: 1,
  Nombre: "Proveedor " + Math.random().toString(36).substring(2),
  Email: "proveedor@example.com",
  FechaAlta: "",
  Telefono: 123123123,
  Activo: true,
};

// test route /api/proveedores GET
describe("GET /api/proveedores", () => {
  it("Deberia devolver todos los proveedores", async () => {
    const res = await request(app).get("/api/proveedores");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toEqual(
      expect.objectContaining({
        IdProveedores: expect.any(Number),
        Nombre: expect.any(String),
        Email: expect.any(String),
        Telefono: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route /api/proveedores/:id GET
describe("GET /api/proveedores/:id", () => {
  it("Deberia devolver el proveedor con el id 1", async () => {
    const res = await request(app).get("/api/proveedores/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdProveedores: expect.any(Number),
        Nombre: expect.any(String),
        Email: expect.any(String),
        Telefono: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route /api/proveedores POST
describe("POST /api/proveedores", () => {
  it("Deberia devolver el proveedor que acabo de crear", async () => {
    const res = await request(app).post("/api/proveedores").send(proveedorAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdProveedores: expect.any(Number),
        Nombre: expect.any(String),
        Email: expect.any(String),
        Telefono: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route /api/proveedores/:id PUT
describe("PUT /api/proveedores/:id", () => {
  it("Deberia devolver el proveedor con el id 1 modificado", async () => {
    const res = await request(app).put("/api/proveedores/1").send(proveedorModificacion);
    expect(res.statusCode).toEqual(200);
  });
});


// test route /api/proveedores/:id DELETE
describe("DELETE /api/proveedores/:id", () => {
  it("Deberia devolver el proveedor con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/proveedores/1");
    expect(res.statusCode).toEqual(200);
  });
});