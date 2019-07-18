const express = require('express')
const router = express.Router()
const FreelaService = require('../services/freela.service')
const service = new FreelaService()

router.get('/', async (req, res, next) => {
    const freelas = await service.listAll()
    res.status(200).send({freelas})
    next()
})
router.post('/', (req, res, next) => {
    res.status(200).send('ok')
    next()
})
router.delete('/:id', (req, res, next) => {
    res.status(200).send('ok')
    next()
})
router.patch('/:id', (req, res, next) => {
    res.status(200).send('ok')
    next()
})

module.exports = router
