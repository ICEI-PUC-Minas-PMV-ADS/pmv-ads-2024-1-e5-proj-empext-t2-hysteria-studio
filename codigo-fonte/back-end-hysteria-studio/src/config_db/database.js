const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('*****nome do seu banco mysql*****', 'root', '*****senha do seu banco mysql*****', {
  host: '*****host do seu banco*****',
  dialect: 'mysql',
});

sequelize.authenticate().then(()=>{
  console.log("Conectado com sucesso!")
}).catch((erro)=>{
  console.log("Falha ao conectar " + erro)
})

module.exports = sequelize;