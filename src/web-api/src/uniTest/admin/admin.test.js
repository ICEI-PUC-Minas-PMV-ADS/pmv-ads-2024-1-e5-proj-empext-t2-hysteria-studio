const request = require('supertest');

test("Rota de login", async () => {

    const body = {
        login: "admin_admin@gmail.com",
        senha: "$2b$08$DgMvfQpk79v9FtTwDofmWO0HPjDxC36lsNMm6/otnXagGJahdupnO"
    }

  await request(`http://localhost:3333`)
    .post("/usuario/login")
    .send(body)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((response) => "foi");
});