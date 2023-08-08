const {Schema, model} = require('mongoose')

const schema = new Schema({
    "content":{type:String, required:true},
    // На чтей станице коментарий
    "pageId":{type:Schema.Types.ObjectId, ref:'User', required: true},
    // Кто оставил комментарий
    "UserId":{type:Schema.Types.ObjectId, ref:'User', required: true},
},{
    timestamps:{createdAr:'created_at'}
})

module.exports = model('Comment', schema)