const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Usuario = require('./usuario');

const pontos = db.define('ponto', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

pontos.belongsTo(Usuario);
Usuario.hasMany(pontos);

module.exports = pontos;