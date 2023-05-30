const { News, User } = require('../models')

const getNewsWithUsers = async () => {
    const news = await News.findAll()
    const newsWithUsers = []

    for (let i = 0; i < news.length; i++) {
        const user = await User.findOne({ where: { id: news[i].userId } })
        newsWithUsers.push({
            ...news[i].dataValues,
            user: user.dataValues,
            id: String(news[i].dataValues.id)
        })
    }

    return newsWithUsers
}

module.exports = getNewsWithUsers
