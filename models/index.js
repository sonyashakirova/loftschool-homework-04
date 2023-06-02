const Message = require('./message')
const News = require('./news')
const User = require('./user')

User.hasMany(News)
News.belongsTo(User)

User.hasMany(Message)
Message.belongsTo(User)

module.exports = {
    Message,
    News,
    User
}
