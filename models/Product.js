const {Schema, model} = require('mongoose')

const schema = new Schema({
    country:String,
    about:String,
    currencies:{type:String,required:true},
    user_id:{type:Schema.Types.ObjectId, ref:'User', required:true},
    name:{type:String,required:true},
    orderInfo:String,
    paymentOptions:String,
    price:Number,
    rrpolicy:String,
    shipping:Number,
    image:[
        {name:String,token:{type: String}}
    ]
},{
    timestamps:true
})

module.exports = model('Product', schema)