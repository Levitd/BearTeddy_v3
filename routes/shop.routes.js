const express = require('express')
const Shop = require('../models/Shop')
const auth = require("../middleware/auth.middleware");
const Comment = require("../models/Comment");
const router = express.Router({mergeParams:true})

router.get('/:shopId',async (req,res)=>{
    const {shopId} = req.params
    try {
        const list = await Shop.findById(shopId)
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})
router
    .route('/')
    .post(auth,async (req, res)=>{
        try {
            const newShop = await Shop.create({
                ...req.body,
                userId:req.user._id
            })
            res.status(201).send(newComment)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка, попробуйте позже...'
            })
        }
    })

module.exports=router