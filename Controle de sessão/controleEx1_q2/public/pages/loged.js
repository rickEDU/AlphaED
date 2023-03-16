import EventCustom from "../eventCustom.js"

async function renderLoged (id){
    try{
        const req =  await fetch(`http://localhost:3000/user/${id}`)
        const json =  await req.json()
        if(json.code!== 200){
            throw json.error    
        }
        const data =  json.data
        const root = document.querySelector('.root')
        root.innerHTML = ``
        const container = document.createElement('div')
        container.innerHTML = `
            <p>
                id: ${data.id} <br>
                nome: ${data.nome} <br>
                email: ${data.email} <br>
                tipo: ${data.tipo} <br>
            </p>
            <input type="button" class="logout" value="Logout">
            `
        root.appendChild(container)
        logicLoged()
    }catch(error){
        const root = document.querySelector('.root')
        const evento =  EventCustom('/')
        root.dispatchEvent(evento);
        console.log("a:",error)
    }
}

function logicLoged(){
    const root = document.querySelector('.root')
    const button = document.querySelector('.logout')
    button.addEventListener('click', ()=>{
        fetch('http://localhost:3000/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})
        .then(()=>{
            const evento =  EventCustom('/')
            root.dispatchEvent(evento);
        })
        .catch((error)=>{
            console.log(error)
        })
    })
    const intervalo = setInterval(()=>{
        fetch('http://localhost:3000/session', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }})
        .then(data =>{
            return data.json()
        })
        .then(data =>{
            if(data.code!== 200){
                throw data.error
            }
        })
        .catch(error =>{
            clearInterval(intervalo)
            const evento =  EventCustom('/')
            root.dispatchEvent(evento);
            console.log(error)
        })
    }, 30000)
}

export {renderLoged}