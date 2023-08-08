const express = require('express')
const Product = require('../models/Product')
const router = express.Router({mergeParams:true})
const config = require('config')
const auth = require("../middleware/auth.middleware");
const Shop = require("../models/Shop");

router
    .route('/')
    .get(async (req,res)=>{
    const {skip} = req.query ? req.query : 0
    try {
        const list = await Product.find({}).sort( { createdAt : -1 }).skip( skip ).limit( config.get('productGetLimit') )
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: '(/)На сервере произошла ошибка, попробуйте позже...'
        })
    }
    })
    .post(auth,async (req, res)=>{
        try {
            const newProduct = await Product.create({
                ...req.body,
                userId:req.user._id
            })
            res.status(201).send(newProduct)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка, попробуйте позже...'
            })
        }
    })
router.get('/:productId',async (req,res)=>{
    const {productId} = req.params
    let list
    try {
        if (productId==="array"){
            // В body передаем массив с id нужных товаров
            list = await Product.find({_id: {$in: [...req.body]}})
        } else {
            list = await Product.findOne({"_id": productId})
        }
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: '(productId)На сервере произошла ошибка, попробуйте позже...'
        })
    }
})

module.exports=router