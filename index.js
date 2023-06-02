require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const http = require('http')
const { Message } = require('./models')

const app = express()
const server = http.createServer(app)
const io = require("socket.io").listen(server)

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', require('./api'))
app.use('/images', express.static(path.join(__dirname, 'upload')))
app.use(express.static(path.join(__dirname, 'build')))

app.use('*', (_req, res) => {
    const file = path.resolve(__dirname, 'build', 'index.html')
    res.sendFile(file)
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
    } catch(err) {
        console.log(err)
    }
}

start()

const connections = {}
io.on('connection', (socket) => {
    socket.on('users:connect', (data) => {
        const user = { ...data, socketId: socket.id, activeRoom: null }
        connections[socket.id] = user

        socket.emit('users:list', Object.values(connections))
        socket.broadcast.emit({ type: 'users:add', data: user })
    })

    socket.on('message:add', async (data) => {
        await Message.create({
            userId: data.senderId,
            recipientId: data.recipientId,
            text: data.text
        })

        socket.emit('message:add', data)
        socket.broadcast.to(data.roomId).emit('message:add', data)
    })

    socket.on('message:history', async (data) => {
        const { userId, recipientId } = data

        const messages = await Message.findAll({
            where: {
                userId: [userId, recipientId],
                recipientId: [userId, recipientId]
            },
            raw: true
        })

        socket.emit('message:history', messages)
    })

    socket.on('disconnect', () => {
        delete connections[socket.id]
        socket.broadcast.emit('users:leave', socket.id)
    })
})
