require('dotenv').config()
const jwt = require('jsonwebtoken')

const token = (user) => {
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

    const verifyToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
    const verifyRefresh = jwt.decode(user.refreshToken, process.env.REFRESH_TOKEN_SECRET)

    return {
        accessToken: token,
        refreshToken: user.refreshToken,
        accessTokenExpiredAt: verifyToken.exp * 1000,
        refreshTokenExpiredAt: verifyRefresh.exp * 1000,
    }
}

module.exports = token
