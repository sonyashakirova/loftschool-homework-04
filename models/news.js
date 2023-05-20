const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const News = sequelize.define('news', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    text: { type: DataTypes.STRING },
})

module.exports = News
