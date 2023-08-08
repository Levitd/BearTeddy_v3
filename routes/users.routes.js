const express = require('express')
const Users = require('../models/User')
const router = express.Router({mergeParams:true})

router.get('/',async (req,res)=>{
    try {
        const list = await Users.find()
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})

module.exports=router