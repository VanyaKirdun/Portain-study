const {Schema, model, ObjectId} = require('mongoose')

const Goods = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    time: {type: Number, required: true},
    cost: {type: Number, required: true},
    descript: {type: String},
    img: {type: String}
})


module.exports = model('Goods', Goods)