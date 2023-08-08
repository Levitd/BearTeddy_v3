const express = require('express')
const router = express.Router({mergeParams:true})

router.use('/auth',require('./auth.routes'))
router.use('/currency',require('./currency.routes'))
router.use('/socialMedia',require('./socialMedia.routes'))
router.use('/users',require('./users.routes'))
router.use('/products',require('./products.routes'))

module.exports=router