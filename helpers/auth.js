require('dotenv').config()
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization

        if (!token) {
            return res.status(403).json({ message: 'Нет доступа' })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decodedToken.id

        next()
    } catch(err) {
        return res.status(403).json({ message: 'Нет доступа' })
    }
}

module.exports = authMiddleware
