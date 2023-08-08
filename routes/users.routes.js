const express = require('express')
const Users = require('../models/User')
const auth  = require('../middleware/auth.middleware')
const router = express.Router({mergeParams:true})

router.get('/',async (req,res)=>{
    try {
        const list = await Users.find({},{email:0,password: 0})
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})

router.patch('/:userId', auth, async (req,res)=>{
    try {
        const {userId} = req.params

        if (userId===req.user._id){
            const updatedUser = await Users.findByIdAndUpdate(userId, req.body, {new:true})
            res.send(updatedUser) // status(200) - можно не отсылать
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})



module.exports=router