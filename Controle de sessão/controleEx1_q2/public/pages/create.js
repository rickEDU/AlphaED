import EventCustom from "../eventCustom.js"

function renderCadastro(){
    const root = document.querySelector('.root')
    root.innerHTML = ``
    const container = document.createElement('div')
    container.innerHTML = `
        <form class="container-login">
            <label class="up-name">Nome:</label>
            <input type="text" class="username" required placeholder="Digite o nome">

            <label class="up-name">Email:</label>
            <input type="text" class="email" required placeholder="Digite o email">

            <label class="up-name">tipo:</label>
            <select  class="tipo" required >
                <option value=""></option>
                <option value="adm">Administrador</option>
                <option value="user">Usuários</option>
            </select>

            <label class="up-name">Senha:</label>
            <input type="password" class="password" required placeholder="Digite sua senha">

            <p class="textErrorLogin"></p>

            <input type="button" class="cadastrar" value="Cadastrar">
            <input type="button" class="cancelar" value="Cancelar">
        </form>`
    root.appendChild(container)
    logicCadastro()
}


function logicCadastro(){
    const root = document.querySelector('.root')
    const textError = document.querySelector('.textErrorLogin')
    const cancelar = document.querySelector('.cancelar')
    const cadastrar = document.querySelector('.cadastrar')
    const nome =  document.querySelector('.username')
    const email =  document.querySelector('.email')
    const tipo =  document.querySelector('.tipo')
    const senha =  document.querySelector('.password')


    cadastrar.addEventListener('click', async ()=>{
        try{
            const body = {nome: nome.value, email: email.value, tipo: tipo.value, senha: senha.value}
            const req = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)})
            const json =  await req.json()
            if(json.code !== 200){
                throw json.error
            }
            textError.innerHTML = 'Usuário cadastrado com sucesso!'
            textError.style.color = 'green';
            setTimeout(() => {
                textError.innerHTML = ''
                const evento =  EventCustom('/')
                root.dispatchEvent(evento);
            }, 3000);
        }catch(error){
            textError.innerHTML = error
            textError.style.color = 'red';
            setTimeout(() => {
                textError.innerHTML = ''
            }, 4000);
        }
    })


    cancelar.addEventListener('click', ()=>{
        const evento =  EventCustom('/')
        root.dispatchEvent(evento);
    })
}

export {renderCadastro}