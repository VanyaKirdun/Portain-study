const fs = require('fs');
const Router = require('express');
const router = new Router();
const Goods = require('../models/Goods');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth.middleware')
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'storageimage', 
    api_key: '597111349611262', 
    api_secret: '1z_OVKMo4hnSTYG2CKhgs0zUcsk' 
  });

router.post('', 
async (reg, res) => {
    try{
        let obj = reg.body
        const goods = new Goods(obj)

        await goods.save()
        return res.json({message: "Goods was created"})
    } catch(e){
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.put('', 
async (reg, res) => {
    try{
        let obj = reg.body 
        if(obj.img!==undefined){
            cloudinary.uploader.destroy(obj.oldImg);
            await Goods.updateOne({_id: obj.id}, { $set: {img: obj.img}})
        }
        await Goods.updateOne({_id: obj.id}, { $set: {name: obj.name}})
        await Goods.updateOne({_id: obj.id}, { $set: {time: obj.time}})
        await Goods.updateOne({_id: obj.id}, { $set: {cost: obj.cost}})
        await Goods.updateOne({_id: obj.id}, { $set: {descript: obj.descript}})
        await Goods.updateOne({_id: obj.id}, { $set: {type: obj.type}})
        

        return res.json({message: "Goods was updated"})
    } catch(e){
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.get('',
async (reg, res) => {
    try {
        const goods = await Goods.find({}, (err, items) => {
            let goodsMap = {};

            items.forEach(item => {
                goodsMap[item.__id] = item;
            })
        })
        return res.json({goods})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Can not get goods"})
    }
})

router.delete('/', authMiddleware,
async (reg, res) => {
    try {
        const goods = await Goods.findOne({_id: reg.query.id})
        await User.find({'goods.itemId': reg.query.id})
        await User.updateMany({'goods.itemId': reg.query.id}, { $pull: { goods: {itemId: reg.query.id}}})
        cloudinary.uploader.destroy(goods.img, function(result) { console.log(result) });
        await goods.remove()
        return res.json({message: "Item was deleted"})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Can not delete"})
    }
})

router.get('/:id',
async (reg, res) => {
    try {
        const goods = await Goods.find({_id: reg.params.id})
        return res.json({goods})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Can not get goods"})
    }
})

router.get('/filter/:data',
async (reg, res) => {
    try {
        const goods = await Goods.find({type: reg.params.data})
        return res.json({goods})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Can not get filter"})
    }
})

router.get('/name/:name/:filter',
async (reg, res) => {
    try {
        let goods = '';
        if(reg.params.filter==='all'){
            goods = await Goods.find({name: reg.params.name})
        }else {
            goods = await Goods.find({type: reg.params.filter, name: reg.params.name})
        }
        return res.json({goods})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Can not get good name"})
    }
})

router.get('/img',
async (reg, res) => {
    try {
        const path = reg.filePath + '\\' + reg.query.img
        if(fs.existsSync(path)){
            return res.send(path)
        }
        
        return res.status(500).json({message: "Download error"})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Download error"})
    }
})

module.exports = router