const express = require('express')
const router = express.Router()
const { newsController } = require('../controllers')

router.get('/', newsController.getAll)
router.post('/', newsController.create)
router.patch('/:id', newsController.update)
router.delete('/:id', newsController.delete)

module.exports = router
