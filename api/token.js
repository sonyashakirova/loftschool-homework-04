const express = require('express')
const router = express.Router()

// POST-запрос на /api/refresh-token - обновление access-токена. 
// В headers['authorization'] прикрепить refresh-токен. 
// Вернуть объект с токенами

router.post('/')

module.exports = router