// const http = require("http");
// const fs = require('fs').promises;
// const host = 'localhost';//se for um servidor remoto, por o IP no lugar do localhost
// const port = 3000;//porta padrão do nodejs é a 3000

// const requestListener = function (req, res) {
//     fs.readFile(__dirname + '/index.html')
//         .then(contents => {
//             res.setHeader("Content-Type", "text/html");
//             res.writeHead(200);
//             res.end(contents);
//         })
//         .catch(err => {
//             res.writeHead(500);
//             res.end(err);
//             return;
//         });
// };

// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//     console.log(`Server is running on http://${host}:${port}`);
// });



// const express = require('express')
// const handlebars = require('express-hendlebars')
// const bodyparse = require('body-parser')
// const app = express()
// const rotas = require('./routers/rotas')
//     app.use(bodyparse.urlencoded({extended: true}))
//     app.use(bodyparse.json())
    
//     app.engine('handlebars', handlebars({defaultLayout: main}))
//     app.set('view engine', 'handlebars')

// const PORT = '8080'
// const HOST = 'localhost'
// app.get("/teste", (req, res) =>{
//     res.json("deu certo")
// })

// app.listen(PORT, ()=>{
//     console.log(`servidor rodando em http:${HOST}:${PORT}`)
// })

import express from "express"
import {soma, subtrair, multiplicar, dividir} from "./calculadora.js"
const app = express()
const PORT = 8080;


app.get("/", (req, res) =>{
    res.status(200);
    res.send("<h1>calculadora</h1><br><h2>Usar o url p/ fazer as operações /calculadora/'operação'/numero1/numero2</h2><br><h3>Operação: soma, subtrair, dividir, multiplicar</h3> ");
})

app.get('/calculadora/soma/:a/:b', (req, res)=>{
    var resultado = soma(req.params.a, req.params.b)
    res.send(`<h1>O resultado foi ${resultado}</h1>`)
})
app.get('/calculadora/subtrair/:a/:b', (req, res)=>{
    var resultado = subtrair(req.params.a, req.params.b)
    res.send(`<h1>O resultado foi ${resultado}</h1>`)
})
app.get('/calculadora/multiplicar/:a/:b', (req, res)=>{
    var resultado = multiplicar(req.params.a, req.params.b)
    res.send(`<h1>O resultado foi ${resultado}</h1>`)
})
app.get('/calculadora/dividir/:a/:b', (req, res)=>{
    var resultado = dividir(req.params.a, req.params.b)
    res.send(`<h1>O resultado foi ${resultado}</h1>`)
})



app.listen(PORT, ()=>{
    console.log(`servidor rodando em http://localhost:${PORT}`)
})