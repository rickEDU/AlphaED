require('dotenv').config()
const express = require('express')
const app = express();

app.use(express.static('./public'))

app.listen(process.env.PORT || 3000, ()=>{
    console.log("rodando na porta: ",process.env.PORT || 3000)
})