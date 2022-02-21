const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const fileUpload = require('express-fileupload')
const authRouter = require('./routes/auth.routes')
const goodsRouter = require('./routes/goods.routes')
const PORT = process.env.PORT || config.get('serverPort')
require('dotenv').config()
const corsMiddleware = require('./middleware/cors.middleware')
const app = express()

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use('/api/goods', goodsRouter)
app.use('/api/user', authRouter)
app.use('/files', express.static('./files'))


const start = async () =>{
    try{
        await mongoose.connect(config.get('dbUserURL'), {
            useUnifiedTopology: true,  // установка опций
            useNewUrlParser: true,
            useCreateIndex: true
         })
         

         app.listen(PORT, ()=>{
             console.log('Server started on port: ', PORT)
         });
    } catch(e){

    }
}

start()