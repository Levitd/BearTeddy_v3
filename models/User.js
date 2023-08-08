const {Schema, model} = require('mongoose')

const schema = new Schema({
    "flName":{ type:String },
    "email":{type:String, required:true, unique:true},
    "password":{type:String},
    "dateOfBirth":{type:Date},
    "licence": Boolean,
    "sex": {type:String, enum:['male','female']},
    "socialMedia":[
        {name:String,"link":{type: String}}
    ],
    "image": [{String}],
    // "profession":{type:Schema.Types.ObjectId, ref:'Profession'},
    // "qualities": [{type:Schema.Types.ObjectId, ref:'Quality'}],
    // "rate":Number,
},{
    timestamps:true
})

module.exports = model('User', schema)