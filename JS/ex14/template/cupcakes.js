import EventCustom from "../event/eventoCustom.js";

export default function Cupcakes(){
    const main = document.getElementById('root')

    const container = document.createElement('div');
    const H1 = document.createElement('h1')
    H1.textContent = "CUPCAKES"
    const home  = document.createElement('button')
    home.textContent = "Home"
    home.classList.add('botao')
    home.addEventListener('click', ()=>{
        const event = EventCustom('/')
        main.dispatchEvent(event)  
    })
    container.appendChild(H1);
    container.appendChild(home);
    return container;
}
