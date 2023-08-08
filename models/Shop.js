const {Schema, model} = require('mongoose')

const schema = new Schema({
    country:String,
    url:String,
    name: String,
    user_id:{type:String,required:true}
},{
    timestamps:true
})

module.exports = model('Shop', schema)