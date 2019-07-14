const express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{  res.status(200).send('ok') })
router.post('/',(req,res,next)=>{  res.status(200).send('ok') })
router.delete('/:id',(req,res,next)=>{  res.status(200).send('ok') })
router.patch('/:id',(req,res,next)=>{ res.status(200).send('ok')  })



module.exports = router;
