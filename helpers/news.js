const { News, User } = require('../models')

const getNewsWithUsers = async () => {
    const news = await News.findAll({ raw: true })
    const newsWithUsers = []

    for (let i = 0; i < news.length; i++) {
        if (news[i].userId) {
            const user = await User.findOne({ where: { id: news[i].userId } })
            newsWithUsers.push({ ...news[i], user: user.toJSON(), id: String(news[i].id) })
        }
    }

    return newsWithUsers
}

module.exports = getNewsWithUsers
