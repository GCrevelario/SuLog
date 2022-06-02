const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sulog', 'root', '#####',{
    host: 'localhost',
    dialect: 'mysql',
})

try{
    sequelize.authenticate()
    console.log('Conectado com sucesso')
}catch (err){
    console.log(`Não foi possivel conectar: ${err}`)
}

module.exports = sequelize;