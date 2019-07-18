const express = require('express')
const db = require('./db')
const app = express()
const freelasRouter = require('./controllers/freelas.restful')
const bodyParser = require('body-parser')



app.use(async (req,res,next)=>{
    await db.connect();
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('ok')
})

// configurar midlewares: compression,cors,serve-static?, morgan
app.use('/freelas', bodyParser.json(),freelasRouter)

app.use(async (req,res,next)=>{
    await db.disconnect();
    next();
});


module.exports = app
