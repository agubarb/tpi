const request = require("supertest");
const app = require("../index");

const prendaAlta = {
  Nombre: "Prenda " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  FechaAlta: new Date().toISOString(),
  Activo: true,
};

const prendaModificacion = {
  IdPrenda: 1,
  Nombre: "Prenda " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Precio: 10.5,
  FechaAlta: new Date().toISOString(),
  Activo: true,
};


// test route/articulos GET
describe("GET /api/prendas", () => {
  it("Deberia devolver todas las prendas", async () => {
    const res = await request(app).get("/api/prendas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
        expect.objectContaining({
          Items: expect.arrayContaining([
            expect.objectContaining({
              IdPrenda: expect.any(Number),
              Nombre: expect.any(String),
              Precio: expect.any(Number),
              FechaAlta: expect.any(String),
              Activo: expect.any(Boolean),
            }),
          ]),
          RegistrosTotal: expect.any(Number),
        })
      );
    });    
});

// test route/articulos/:id GET
describe("GET /api/articulos/:id", () => {
  it("Deberia devolver la prenda con el id 1", async () => {
    const res = await request(app).get("/api/prendas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdPrenda: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route/articulos POST
describe("POST /api/prendas", () => {
  it("Deberia devolver la prenda que acabo de crear", async () => {
    const res = await request(app).post("/api/prendas").send(prendaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdPrenda: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route/articulos/:id PUT
describe("PUT /api/prendas/:id", () => {
  it("Deberia devolver la prenda con el id 1, modificado", async () => {
    const res = await request(app).put("/api/prendas/1").send(prendaModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/articulos/:id DELETE
describe("DELETE /api/prendas/:id", () => {
  it("Deberia devolver la prenda con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/prendas/1");
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
