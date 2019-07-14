const mongoose = require('mongoose')
const config = require('./config')

module.exports = {
    connect: () => mongoose.connect(config.dbUrl, { useNewUrlParser: true }),
    disconnect: callback => mongoose.connection.close(callback),
}
