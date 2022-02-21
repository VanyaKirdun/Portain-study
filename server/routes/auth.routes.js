const Router = require('express');
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require('express-validator');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware')

router.post('/auth/registration', 

[
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 15').isLength({min: 3, max:12})
],

async (reg, res) => {
    try{
        const errors = validationResult(reg)
        if(!errors.isEmpty()){
            return res.status(400).json({message: 'Uncorrect request', errors})
        } 

        const {email, password} = reg.body

        const candidate = await User.findOne({email})
    
        if(candidate){
            return res.status(400).json({message: `User with email ${email} already exist`})
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({email, password: hashPassword, userType: 'user'})
        await user.save()
        return res.json({message: "User was created"})
    } catch(e){
        res.send({message: "Server error"})
    }
})

router.put('', authMiddleware,
async (reg, res) => {
    try{
        let obj = reg.body 
        let user = await User.find({_id: reg.user.id})
        let mass = {itemId: obj.itemId, number: 1}
        
        if(Object.keys(user[0].goods).length == 0){
            await User.updateOne({_id: reg.user.id}, { $push: {goods: mass}})
        } else {
            let check = ''
            let trys = Object.values(user[0].goods).some((value,index) => {
                check = index
                console.log(value[0].itemId, obj.itemId)
                return value[0].itemId===obj.itemId
            })
            if(trys){
                user[0].goods[check][0].number=user[0].goods[check][0].number+1
                await User.updateOne({_id: reg.user.id}, { $set: {goods: user[0].goods}})
            } else {
                await User.updateOne({_id: reg.user.id}, { $push: {goods: mass}})
            }
        }
    } catch(e){
        res.send({message: "Can not add item"})
    }
})

router.put('/clear', authMiddleware, 
async (reg, res) => {
    try{
        let obj = reg.body.file
        let user = await User.find({_id: reg.query.id})
        let check = ''
        let trys = Object.values(user[0].goods).some((value,index) => {
            check = index
            return value[0].itemId===obj.id
        })
        if(trys){
            if(user[0].goods[check][0].number-1===0){
                user[0].goods.splice(check, 1);
            } else{
                user[0].goods[check][0].number=user[0].goods[check][0].number-1
            }
            await User.updateOne({_id: reg.user.id}, { $set: {goods: user[0].goods}})
        }
    } catch(e){
        console.log(e)
        res.send({message: "Can not clear item"})
    }
})

router.get('/:id/goods', 
async (reg, res) => {
    try{
        const user = await User.find({_id: reg.params.id})
        return res.json(user[0])

    } catch(e){
        res.send({message: "Server error"})
    }
})

router.post('/auth/login', 
async (reg, res) => {
    try{
        const {email, password} = reg.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid){
            return res.status(404).json({message: "Invalid password"})
        }
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
        return res.json({
            token,
            user:{
                id: user.id,
                email: user.email,
                userType: user.userType
            }
        })
    } catch(e){
        res.send({message: "Server error"})
    }
})

router.get('/auth/auth', authMiddleware, 
async (req, res) => {
    try{
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
        return res.json({
            token,
            user:{
                id: user.id,
                email: user.email,
                userType: user.userType
            }
        })
    } catch(e){
        return res.status(401).json({message: `${e}`})
    }
})

module.exports = router