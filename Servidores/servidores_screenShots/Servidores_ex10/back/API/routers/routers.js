const express = require('express')
const routes = express.Router()
const fs = require('fs')

//Nosso BD fictício.
let DB = JSON.parse(fs.readFileSync('./data/data.json'))

//retorna todos os registros
routes.get("/users", (req, res)=>{
    res.status(200).json({
        status:"sucess",
        count: DB.length,
        data: DB
    });
})
//retorna um registro pelo ID.
routes.get("/users/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    let objeto = DB.find(objeto => objeto.id === id)
    if(!objeto){
        return res.status(404).json({status: 'Not Found'})
    }
    res.status(200).json({
        status: 'sucess',
        data: objeto});
})
//Adciona um registro.
routes.post("/users", (req, res)=>{
    const body = req.body
    const teste = JSON.stringify(body)

    console.log(teste)
    let id = 0
    if(DB.length>0){
        id = DB[DB.length -1].id +1;
    }
    let format_user = Object.assign({id:id}, body)
    console.log(format_user)
    // const format_user = {
    //     id: id,
    //     nome: body.nome,
    //     email: body.email
    // }
    DB.push(format_user);
    fs.writeFile('./data/data.json', JSON.stringify(DB), ()=>{
        res.status(201).json({
            status: 'sucess',
            data: format_user
        })
    })
})
//Atualiza um resgistro.
routes.patch("/users/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const body = req.body;
    let objeto = DB.find(objeto => objeto.id=== id)
    if(!objeto){
        return res.status(404).json({erro: 'Not Found'})
    }
    const updateUser = Object.assign(objeto, body)
    updateUser.id = id;
    DB[DB.indexOf(objeto)] = updateUser;
    fs.writeFile('./data/data.json', JSON.stringify(DB), () =>{
        res.status(200).json({
            status: 'sucess',
            data: objeto
        })
    })
})
//Deleta um registro.
routes.delete("/users/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    let objeto = DB.find(objeto => objeto.id === id)
    if(!objeto){
        res.status(404).json({erro: 'Not Found'})
    }
    DB.splice(DB.indexOf(objeto),1)
    fs.writeFile('./data/data.json', JSON.stringify(DB), () =>{
        res.status(200).json({
            status: 'sucess',
            data: objeto
        })
    })
})

module.exports = routes