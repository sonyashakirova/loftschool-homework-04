require('dotenv').config()
const express = require('express')
const router = express.Router()
const authMiddleware = require('../helpers/auth')

router.use('/registration', require('./registration'))
router.use('/login', require('./login'))
router.use('/refresh-token', require('./token'))
router.use('/profile', authMiddleware, require('./profile'))
router.use('/users', authMiddleware, require('./users'))
router.use('/news', authMiddleware, require('./news'))

module.exports = router
