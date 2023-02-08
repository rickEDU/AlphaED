const fs = require('fs')


//Retorna todos os usuários
let DB = JSON.parse(fs.readFileSync('./src/data/data.json'))

exports.get_all_user = (req, res)=>{
    res.status(200).json({
        status:"sucess",
        count: DB.length,
        data: DB
    });
}

//Retorna um usuário pelo ID.
exports.get_id_user = (req, res) => {
    const id = parseInt(req.params.id)
    let objeto = DB.find(objeto => objeto.id === id)
    if(!objeto){
        return res.status(404).json({status: 'Not Found'})
    }
    res.status(200).json({
        status: 'sucess',
        data: objeto});
}

// Adiciona um usuário;
exports.add_user = (req, res) => {
    const body = req.body
    let id = 0
    if(DB.length>0){
        id = DB[DB.length -1].id +1;
    }
    
    const format_user = {
        id: id,
        nome: body.nome,
        email: body.email
    }
    DB.push(format_user);
    fs.writeFile('./src/data/data.json', JSON.stringify(DB), ()=>{
        res.status(201).json({
            status: 'sucess',
            data: format_user
        })
    })
}

//Atualiza um objeto no DB.
exports.update_user = (req, res) => {
    const id = parseInt(req.params.id);
    const body = req.body;
    let objeto = DB.find(objeto => objeto.id=== id)
    if(!objeto){
        return res.status(404).json({erro: 'Not Found'})
    }
    const updateUser = Object.assign(objeto, body)
    updateUser.id = id;
    DB[DB.indexOf(objeto)] = updateUser;
    fs.writeFile('./src/data/data.json', JSON.stringify(DB), () =>{
        res.status(200).json({
            status: 'sucess',
            data: objeto
        })
    })
}

//Deleta um objeto no DB.
exports.delete_user = (req, res) => {
    const id = parseInt(req.params.id)
    let objeto = DB.find(objeto => objeto.id === id)
    if(!objeto){
        res.status(404).json({erro: 'Not Found'})
    }
    DB.splice(DB.indexOf(objeto),1)
    fs.writeFile('./src/data/data.json', JSON.stringify(DB), () =>{
        res.status(200).json({
            status: 'sucess',
            data: objeto
        })
    })
}
