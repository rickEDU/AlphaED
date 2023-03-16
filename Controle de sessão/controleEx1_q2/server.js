require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const router = require('./src/routes/router')
const app = express()



const PORT = process.env.PORT;
const HOSTNAME = process.env.HOST;
app.use(bodyParser.json())
app.use(cookieParser())
app.use(router)
app.use(express.static('./public'))

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://${HOSTNAME}:${PORT}`)
})