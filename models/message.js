const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING },
    recipientId: { type: DataTypes.INTEGER },
})

module.exports = Message
