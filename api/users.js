const express = require('express')
const router = express.Router()

// Автоматический GET-запрос на /api/users - получение списка пользователей. 
// Необходимо вернуть список всех пользоватлей из базы данных.

router.get('/')

// DELETE-запрос на /api/users/:id - удаление пользователя.

router.delete('/:id')

// PATCH-запрос на /api/users/:id/permission
// обновление существующей записи о разрешениях конкретного пользователя.

router.patch('/:id/permission')

module.exports = router
