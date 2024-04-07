const request = require('supertest');

test("Rota GET de usuarios geral", async () => {

  await request(`http://localhost:3333`)
    .get("/servicos")
    .expect("Content-Type", /json/)
    .expect(200)
    .then((response) => "foi");
});

test("Rota GET de usuarios geral", async () => {

  const body = {
    "servico_id": "e28fa9d5-56c2-497e-b797-8b7dd4e9a230"
  }

await request(`http://localhost:3333`)
  .get("/servico/id")
  .send(body)
  .expect("Content-Type", /json/)
  .expect(200)
  .then((response) => "foi");
});