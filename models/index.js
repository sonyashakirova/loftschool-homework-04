const News = require('./news')
const User = require('./user')

User.hasMany(News)
News.belongsTo(User)

module.exports = {
    News,
    User
}
