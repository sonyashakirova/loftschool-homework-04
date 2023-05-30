const { News } = require('../models')
const getNewsWithUsers = require('../helpers/news')

class newsController {
    /**
     * Получение списка новостей
     */
    async getAll(req, res) {
        try {
            const newsWithUsers = await getNewsWithUsers()

            return res.json(newsWithUsers)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Создание новой новости
     */
    async create(req, res) {
        try {
            await News.create({ ...req.body, userId: req.userId })
            const newsWithUsers = await getNewsWithUsers()
            
            return res.json(newsWithUsers)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Обновление существующей новости
     */
    async update(req, res) {
        try {
            const { id } = req.params
            await News.update({ ...req.body }, { where: { id } })
            const newsWithUsers = await getNewsWithUsers()
            
            return res.json(newsWithUsers)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Удаление существующей новости
     */
    async delete(req, res) {
        try {
            const { id } = req.params
            await News.destroy({ where: { id } })
            const newsWithUsers = await getNewsWithUsers()
            
            return res.json(newsWithUsers)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    
}

module.exports = new newsController
