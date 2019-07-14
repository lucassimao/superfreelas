const express = require('express')
const app = express()
const freelasRouter = require('./controllers/freelas.restful')

app.get('/', (req, res) => {
    res.status(200).send('ok')
})
app.use('/freelas', freelasRouter)

module.exports = app
