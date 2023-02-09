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