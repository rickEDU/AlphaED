const express = require('express')
const cors = require("cors");
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const HOST = process.env.HOST
const Routes = require('./src/routers/routers'); 
const bodyParser = require('body-parser');


app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(Routes)



app.listen(PORT, HOST, ()=>{
    console.log(`servidor rodando em http://${HOST}:${PORT}`)
})