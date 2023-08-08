const express = require('express')
const Statistics = require('../models/Statistics')
const config = require('config')
const router = express.Router({mergeParams:true})
const auth  = require('../middleware/auth.middleware')
const Product = require("../models/Product");

router.get('/',auth, async (req,res)=>{
    const countViewed=config.get('statisticLastViewed')
    const userId = req.user._id
    try {
        const list = await Statistics.find({"user_id":userId}).sort( { createdAt : -1 }).limit( countViewed )
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})
router.post('/',async (req,res)=>{
    // Если просматривает авторизованный, то в запросе надо прислать UserId
    try {
        const newRecord = await Statistics.create({
            ...req.body
        })
        res.status(201).send(newProduct)
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})
module.exports=router