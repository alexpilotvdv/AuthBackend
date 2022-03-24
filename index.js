import express from 'express'
import router from './router/router.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
//require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api',router)
startApp()
async function startApp(){
    try{
        app.listen(PORT,()=>console.log(`server start on port ${PORT}`))
    }
    catch (e){
console.log(e)
    }
}