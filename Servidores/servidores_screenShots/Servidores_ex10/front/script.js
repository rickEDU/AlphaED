document.getElementById('input-box').addEventListener('input', ()=>{
    let nome = document.getElementById('nome-input')
    nome.value = nome.value.replace(/[\031-\037]/g, "")
    nome.value = nome.value.replace(/[\041-\100]/g, "")
    nome.value = nome.value.replace(/[\133-\140]/g, "")
    nome.value = nome.value.replace(/[\173-\277]/g, "")
})

const tabela = async() =>{
    
    let req =  await fetch('http://192.168.1.7:8080/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null,
    })
    let json = await req.json()
    let DB = json.data
    let tableB = document.getElementById("tabela");

    document.getElementById('tabela').innerHTML = `
            <tr id="table-heading">
            <td class="id-number">#ID</td>
            <td class="nome">NOME</td>
            <td class="e-mail">E-MAIL</td>
            <td class="editar">EDITAR</td>
            <td class="excluir">EXCLUIR</td>
            </tr>`
    for(let i=0;i<DB.length;i++){
    let row = tableB.insertRow()

    let idCel = row.insertCell()
    idCel.classList.add('id-number')

    let nomeCel = row.insertCell()
    nomeCel.classList.add('nome')

    let emailCel = row.insertCell()
    emailCel.classList.add('e-mail')

    let editCel = row.insertCell()
    editCel.classList.add('editar')

    let deleteCel = row.insertCell()
    deleteCel.classList.add('excluir')

    idCel.innerHTML  = DB[i].id
    nomeCel.innerHTML  = DB[i].nome
    emailCel.innerHTML  = DB[i].email
    editCel.innerHTML  = `<img src="./src/lapis.png" alt="Ícone de editar" onclick='editar(${DB[i].id})'>`
    deleteCel.innerHTML  = `<img src="./src/excluir.png" alt="Ícone de excluir" onclick='excluir(${DB[i].id})'>`
    }
}


//cadastro
const cadastro =  ()=>{

    let nome = document.getElementById('nome-input').value
    let email = document.getElementById('e-mail-input').value
    let body = {"nome": nome, "email": email}

    fetch('http://192.168.1.7:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    }).then(()=>{
        limpar()
        tabela()
        })
}

//troca os campos para preparar a atualização do objeto.
const editar = async (id)=>{
    let req =  await fetch('http://192.168.1.7:8080/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null,
    })
    let json = await req.json()
    let res = json
    let DB = res.data
    let box = document.getElementById('input-box')
    box.innerHTML = `
    <input type="text" id="nome-input" class="input-field" placeholder="Nome">
    <input type="text" id="e-mail-input" class="input-field" placeholder="E-mail">
    <input type="button" value="salvar" onclick="salvar(${id})" id="cadastrar"> 
    <input type="button" value="cancelar" onclick="limpar()" id="cancelar"> `

    let user = DB.find(user => user.id===id)
    document.getElementById('nome-input').value = user.nome
    document.getElementById('e-mail-input').value = user.email
    
}

//faz a requisição para salvar no DB.
const salvar = (id)=>{
    let nome = document.getElementById('nome-input').value
    let email = document.getElementById('e-mail-input').value
    let body = {"nome": nome, "email": email}
        
    fetch(`http://192.168.1.7:8080/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    }).then(()=>{
        limpar()
        tabela()
    })


}

//cancela a atualização.
const limpar = ()=>{
    let box = document.getElementById('input-box')
    box.innerHTML = `
    <input type="text" id="nome-input" class="input-field" placeholder="Nome">
    <input type="text" id="e-mail-input" class="input-field" placeholder="E-mail">
    <input type="button" value="Cadastrar" onclick="cadastro()" id="cadastrar"> `
}

//exclui um objeto do DB.
const excluir = (id)=>{
    fetch(`http://192.168.1.7:8080/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null,
    }).then(()=>{
        limpar()
        tabela()
    })

}


tabela()