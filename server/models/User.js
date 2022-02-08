const {Schema, model, ObjectId} = require('mongoose')

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    goods: [{type: Array, ref:'Goods'}],
    userType:{type: String, required: true}
})

module.exports = model('User', User)