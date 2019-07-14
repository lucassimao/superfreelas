const app = require('./server')
const config = require('./config')

app.listen(config.port, () => {
    console.log('superfreelas is up and running')
})
