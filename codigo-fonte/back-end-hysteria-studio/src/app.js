const express = require('express');
const bodyParser = require('body-parser');
const servicosRoutes = require('./routes/servicos.js');
const agendamentos = require('./routes/agendamento.js');
const usuarios = require('./routes/usuario.js');
const login = require('./routes/login.js');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use('/', servicosRoutes);
app.use('/', agendamentos)
app.use('/', usuarios)
app.use('/', login)

app.get('/', (req, res)=>{
    res.json("Hysteria Studio - API");
})

app.listen(port, () => {
    console.log(`Servidor rodando http://localhost:${port}`);
});