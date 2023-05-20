const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, require: true },
    firstName: { type: DataTypes.STRING },
    middleName: { type: DataTypes.STRING },
    surName: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, require: true },
    // accessToken: { type: DataTypes.STRING },
    // refreshToken: { type: DataTypes.STRING },
    // accessTokenExpiredAt: { type: DataTypes.DATE },
    // refreshTokenExpiredAt: { type: DataTypes.DATE }
})

module.exports = User
