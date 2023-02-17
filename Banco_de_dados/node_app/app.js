const express = require('express')
const cors = require('cors')
const app = express()
const Routes = require('./src/routs/router')
require('dotenv').config()
app.use(express.json())
app.use(cors());
// app.use(bodyParser.urlencoded({extended: false}))
app.use(Routes)

const HOST = process.env.SERVER_HOST
const PORT = process.env.SERVER_PORT

app.listen(PORT, HOST, ()=>{
    console.log(`servidor rodando em http://${HOST}:${PORT}`)
})