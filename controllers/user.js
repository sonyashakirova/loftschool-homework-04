require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const { User } = require('../models')
const token = require('../helpers/token')

class UserController {
    /**
     * Создание нового пользователя (регистрация)
     */
    async register(req, res) {
        try {
            const { username, password } = req.body
            if (!username || !password) {
                return res.status(400).json({ message: 'Не заполнены обязательные поля' })
            }

            const alreadyExists = await User.findOne({ where: { username }})
            if (alreadyExists) {
                return res.status(400).json({ message: 'Данный пользователь уже существует' })
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ ...req.body, password: hashPassword })

            const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' })
            await User.update({ refreshToken }, { where: { id: user.id } })

            return res.json(user)
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

            const tokenData = token(user)

            return res.json({ ...user, ...tokenData })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Обновление access-токена
     */
    async refreshToken(req, res) {
        try {
            const newRefreshToken = jwt.sign({ id: req.userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' })
            await User.update({ refreshToken: newRefreshToken }, { where: { id: req.userId } })

            const user = await User.findOne({ where: { id: req.userId } })
            const newTokenData = token(user)

            return res.json(newTokenData)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Авторизация при наличии токена
     */
    async profileAccess(req, res) {
        try {
            const user = await User.findOne({ where: { id: req.userId } })

            return res.json(user)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Обновление информации о пользователе
     */
    async profileUpdate(req, res) {
        try {
            const { firstName, middleName, surName, oldPassword, newPassword } = req.body

            if (newPassword) {
                const { password } = await User.findOne({ where: { id: req.userId } })
                const comparePassword = await bcrypt.compare(oldPassword, password)

                if (!comparePassword) {
                    return res.status(400).json({ message: 'Неверный пароль' })
                }

                const hashPassword = await bcrypt.hash(newPassword, 5)
                await User.update({ password: hashPassword }, { where: { id: req.userId } })
            }

            if (req.files) {
                const { avatar } = req.files
                const fileName = req.userId + '.jpg'
                avatar.mv(path.resolve(__dirname, '..', 'upload', fileName))
                await User.update({ image: 'images/' + fileName }, { where: { id: req.userId } })
            }
            
            await User.update({ firstName, middleName, surName }, { where: { id: req.userId } })
            const user = await User.findOne({ where: { id: req.userId } })
            
            return res.json(user)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Обновление существующей записи о разрешениях конкретного пользователя
     */
    async permissionUpdate(req, res) {
        try {
            const { id } = req.query
            const { permission } = req.body

            await User.update({ permission }, { where: { id } })
            const user = await User.findOne({ where: { id } })

            return res.json(user.permission)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Получение списка пользователей
     */
    async getAll(req, res) {
        try {
            const users = await User.findAll()

            return res.json(users)
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

            return res.json({ message: 'Пользователь удален' })
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = new UserController
