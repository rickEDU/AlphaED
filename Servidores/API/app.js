const express = require('express')
const cors = require("cors");
const app = express()
const PORT = 8080;
const host = 'localhost'
const Routes = require('./src/routers/routers'); 
const bodyParser = require('body-parser');


app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(Routes)



app.listen(PORT, host, ()=>{
    console.log(`servidor rodando em http://${host}:${PORT}`)
})