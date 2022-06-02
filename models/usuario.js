const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Usuario = db.define('usuario', {
    name:{
        type: DataTypes.STRING,
        require: true,
    },
    email:{
        type: DataTypes.STRING,
        require: true,
    },
    senha:{
        type: DataTypes.STRING,
        require: true,
    },
})

module.exports = Usuario;