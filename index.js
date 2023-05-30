require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', require('./api'))
app.use('/images', express.static(path.join(__dirname, 'upload')))
app.use(express.static(path.join(__dirname, 'build')))

app.use(async (req, res, next) => {
    return res.status(404).json({ message: 'Страница не найдена' })
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
    } catch(err) {
        console.log(err)
    }
}

start()
