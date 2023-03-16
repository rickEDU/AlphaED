import EventCustom from "../eventCustom.js"

function renderInitial(){
    const root = document.querySelector('.root')
    root.innerHTML = ``
    const container = document.createElement('div')
    container.innerHTML = `
        <form class="container-login">
            <label class="up-name"  for="username">email:</label>
            <input type="text" class="username" name="username" required placeholder="Digite o emmail">

            <label class="up-name" for="password">Senha:</label>
            <input type="password" class="password" name="password" required placeholder="Digite a senha">

            <p class="textErrorLogin"></p>

            <input type="button" class="login" value="Entrar">
            <input type="button" class="cadastrar" value="Cadastrar">
        </form>`
    root.appendChild(container)
    logicInitial()
}

function logicInitial(){
    const root = document.querySelector('.root')
    const username = document.querySelector('.username')
    const password = document.querySelector('.password')
    const button = document.querySelector('.login')
    const cadastro = document.querySelector('.cadastrar')
    button.addEventListener('click', async ()=>{
        try{
            const body = {email: username.value, senha: password.value}
            
            const result = await fetch(`http://localhost:3000/session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
            })
            const json = await result.json()
            if(json.code!== 200){
                throw json.error
            }
            const evento =  EventCustom('/login', json.data.id)
            root.dispatchEvent(evento);
            
        }catch(error){
            const textError = document.querySelector('.textErrorLogin')
            textError.innerHTML = error
            textError.style.color = 'red';
            setTimeout(() => {
                textError.innerHTML = ''
            }, 4000);
        }
    })
    cadastro.addEventListener('click', ()=>{
        const evento =  EventCustom('/cadastro')
        root.dispatchEvent(evento);
    })
}

export { renderInitial }