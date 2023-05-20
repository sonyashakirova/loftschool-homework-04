const express = require('express')
const router = express.Router()

// GET-запрос на /api/profile - авторизация при наличии токена. 
// Необходимо вернуть объект пользователя.

router.get('/')

// PATCH-запрос на /api/profile - обновление информации о пользователе.
// Необходимо вернуть объект обновленного пользователя.

router.patch('/')

module.exports = router