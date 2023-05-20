const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')

router.post('/', userController.register)

module.exports = router
