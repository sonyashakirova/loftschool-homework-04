require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const session = require('express-session')
const { User } = require('./models')
const FileStore = require('session-file-store')(session)

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', require('./api'))
app.use(express.static(path.join(__dirname, 'build')))
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy((username, password, done) => {
//     User.findOne({ where: { username } })
//         .then(user => {
//             if (!user) return done(null, false)
//             return done(null, user)
//         })
//         .catch(err => done(err))
// }))

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
