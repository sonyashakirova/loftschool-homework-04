const { News } = require('../models')

class newsController {
    /**
     * Получение списка новостей
     */
    async getAll(req, res) {
        try {
            const news = await News.findAll()

            return res.json(news)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }

    /**
     * Создание новой новости
     */
    async create(req, res) {
        
    }

    /**
     * Обновление существующей новости
     */
    async update(req, res) {
        const { id } = req.query
    }

    /**
     * Удаление существующей новости
     */
    async delete(req, res) {
        try {
            const { id } = req.query
            await News.destroy({ where: { id } })
            const news = await News.findAll()
            
            return res.json(news)
        } catch(err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = new newsController
