const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')

router.get('/', userController.profileAccess)
router.patch('/', userController.profileUpdate)

module.exports = router
