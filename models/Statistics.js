const {Schema, model} = require('mongoose')

const schema = new Schema({
    product_id:{type:Schema.Types.ObjectId, ref:'Product', required:true},
    ip:String,
    country:String,
    useId:{type:Schema.Types.ObjectId, ref:'User', required:true},
},{
    timestamps:true
})

module.exports = model('Statistics', schema)