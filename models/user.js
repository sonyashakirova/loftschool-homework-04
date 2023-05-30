const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, require: true },
    firstName: { type: DataTypes.STRING },
    middleName: { type: DataTypes.STRING },
    surName: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, require: true },
    refreshToken: { type: DataTypes.STRING },
    permission: { type: DataTypes.JSON, defaultValue: {
        chat: { C: true, R: true, U: true, D: true },
        news: { C: true, R: true, U: true, D: true },
        settings: { C: true, R: true, U: true, D: true }
    }},
})

module.exports = User
