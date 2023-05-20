const express = require('express')
const router = express.Router()

// POST-запрос на /api/registration - создание нового пользователя (регистрация). 
// Сигнатура запроса: { username, surName, firstName, middleName, password }. 
// Необходимо вернуть объект авторизовавшегося пользователя.

router.post('/')

module.exports = router
