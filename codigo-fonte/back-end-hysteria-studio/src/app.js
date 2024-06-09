const express = require('express');
const bodyParser = require('body-parser');
const servicosRoutes = require('./routes/servicosRoute.js');
const agendamentos = require('./routes/agendamentoRoute.js');
const usuarios = require('./routes/usuarioRoute.js');
const horarios = require('./routes/horarioRoute.js');
const login = require('./routes/loginRoute.js');
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
app.use('/', horarios)

app.get('/', (req, res)=>{
    res.json("Hysteria Studio - API");
})

app.listen(port, () => {
    console.log(`Servidor rodando http://localhost:${port}`);
});