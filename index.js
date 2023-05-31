require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const http = require('http')
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

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

const connections = {}; 
io.on('connection', (socket) => {
    // connections[socket.id] = {
    //     username
    //     socketId
    //     userId
    //     activeRoom
    // }

    socket.on('users:connect', () => {
        socket.send({ type: 'users:list', data: connections })
        socket.broadcast.send({ type: 'users:add`', data: {} })
    })

    socket.io('message:add', (message) => {
        socket.send({ type: 'message:add', message, data: {} })
    })

    socket.io('message:history', () => {
        socket.send({ type: 'message:history', data: {} })
    })

    socket.on('disconnect', () => {
        socket.broadcast.send({ type: 'users:leave`', data: {} })
    })
})
