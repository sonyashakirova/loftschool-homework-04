const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')

router.get('/', userController.getAll)
router.patch('/:id/permission', userController.permissionUpdate)
router.delete('/:id', userController.delete)

module.exports = router
