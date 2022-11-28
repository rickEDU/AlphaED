import EventCustom from "./eventoCustom.js";

export default function Brigadeiros(){
    const main = document.getElementById('root')

    const container = document.createElement('div');
    const H1 = document.createElement('h1')
    H1.textContent = "BRIGADEIROS"
    const home  = document.createElement('button')
    home.textContent = "Home"
    home.addEventListener('click', ()=>{
        const event = EventCustom('/')
        main.dispatchEvent(event)  
    })
    container.appendChild(H1);
    container.appendChild(home);
    return container;
}

