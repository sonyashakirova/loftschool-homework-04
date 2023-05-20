require('dotenv').config()
const bcrypt = require('bcrypt')
const { User } = require('../models')

class UserController {
    /**
     * Создание нового пользователя (регистрация)
     */
    async register(req, res) {
        try {
            const { username, surName, firstName, middleName, password } = req.body
            if (!username || !password) {
                return res.status(400).json({ message: 'Не заполнены обязательные поля' })
            }

            const alreadyExists = await User.findOne({ where: { username }})
            if (alreadyExists) {
                return res.status(400).json({ message: 'Данный пользователь уже существует' })
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({
                username,
                surName,
                firstName,
                middleName,
                password: hashPassword
            })

            return res.json({ data: user })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Авторизация после пользователького ввода
     */
    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ where: { username }})

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {
                return res.status(400).json({ message: 'Неверный пароль' })
            }

            return res.json({ data: user })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Обновление access-токена
     */
    async refreshToken(req, res) {
    }

    /**
     * Авторизация при наличии токена
     */
    async profileAccess(req, res) {
    }

    /**
     * Обновление информации о пользователе
     */
    async profileUpdate(req, res) {
    }

    /**
     * Обновление существующей записи о разрешениях конкретного пользователя
     */
    async permissionUpdate(req, res) {
        const { id } = req.query
    }

    /**
     * Получение списка пользователей
     */
    async getAll(req, res) {
        try {
            const users = await User.findAll()

            return res.json({ data: users })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Удаление пользователя
     */
    async delete(req, res, next) {
        try {
            const { id } = req.query
            await User.destroy({ where: { id } })

            return res.json({ data: 'Пользователь удален' })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = new UserController
