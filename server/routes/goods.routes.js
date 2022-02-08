const fs = require('fs');
const Router = require('express');
const router = new Router();
const config = require('config')
const Goods = require('../models/Goods');
const User = require('../models/User');
const mongoose = require('mongoose')
const authMiddleware = require('../middleware/auth.middleware')


function makeName(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < n; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

router.post('', 
async (reg, res) => {
    try{
        const file = reg.files.file
        
        let path = `${config.get('filePath')}\\${file.name}`
        let check = true
        while(check){
            if(fs.existsSync(path)){
                file.name = makeName(10) + file.name
                path = `${config.get('filePath')}\\${file.name}`
            } else{
                check = false
            }

        }
        file.mv(path)
        let obj = reg.body
        obj['img'] = file.name;
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
        if(reg.files!==null){
            const file = reg.files.file
            
            let path = `${config.get('filePath')}\\${file.name}`
            let check = true
            while(check){
                if(fs.existsSync(path)){
                    file.name = makeName(10) + file.name
                    path = `${config.get('filePath')}\\${file.name}`
                } else{
                    check = false
                }

            }
            
            file.mv(path)
            await Goods.updateOne({_id: obj.id}, { $set: {img: file.name}})
        }
        await Goods.updateOne({_id: obj.id}, { $set: {name: obj.name}})
        await Goods.updateOne({_id: obj.id}, { $set: {time: obj.time}})
        await Goods.updateOne({_id: obj.id}, { $set: {cost: obj.cost}})
        await Goods.updateOne({_id: obj.id}, { $set: {descript: obj.descript}})
        await Goods.updateOne({_id: obj.id}, { $set: {type: obj.type}})
        

        return res.json({message: "Goods was updated"})
    } catch(e){
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
        let path = `${config.get('filePath')}\\${goods.img}`
        console.log(reg.query.id)
        let user = await User.find({'goods.itemId': reg.query.id})
        await User.updateMany({'goods.itemId': reg.query.id}, { $pull: { goods: {itemId: reg.query.id}}})
        fs.unlink( path, (err => {
            if (err) console.log(err);
            else {
              console.log("\nDeleted file: example_file.txt");
            }
          }) )
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
        const path = config.get('filePath') + '\\' + reg.query.img
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