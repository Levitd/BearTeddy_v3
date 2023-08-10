const express = require('express')
const Product = require('../models/Product')
const router = express.Router({mergeParams:true})
const config = require('config')
const auth = require("../middleware/auth.middleware");
const cors = require('cors');
const mongoose = require("mongoose");

router.route('/:productId')
    .get(async (req,res)=>{
    const {productId} = req.params
    let list
    try {
        if (productId==="array"){
            const newArra = JSON.parse(req.query.array)
            // // В body передаем массив с id нужных товаров
            list = await Product.find({_id: {$in: newArra}})
        } else {
            list = await Product.findOne({_id: productId})
        }
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: '(productId)На сервере произошла ошибка, попробуйте позже...'
        })
    }
})
    .patch(auth,async (req, res)=>{
        try {
            const id =new mongoose.Types.ObjectId(req.body._id)
            const updateProduct = await Product.findByIdAndUpdate(id,{
                ...req.body,
                user_id:req.user._id
            },{new:true})
            res.status(201).send(updateProduct)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'На сервере произошла ошибка, попробуйте позже...'
            })
        }
    })

router
    .route('/')
    .get(cors(), async (req,res)=>{
    let {skip, user_id} = req.query ? req.query : 0
        skip = !skip ? 0 : skip
        // console.log(req.query,skip)
    try {
        const list = await Product.find(user_id ? {user_id:user_id } :{}).sort( { createdAt : -1 }).skip( skip ).limit( config.get('productGetLimit') )
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
                user_id:req.user._id
            })
            res.status(201).send(newProduct)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'На сервере произошла ошибка, попробуйте позже...'
            })
        }
    })


module.exports=router