import EventCustom from "./eventoCustom.js";

export default function Home(){

    const main = document.getElementById('root')

    const container = document.createElement('div');
    const H1 = document.createElement('h1')
    H1.textContent = "Doceria"

    const doces  = document.createElement('button')
    doces.textContent = "DOCES "
    doces.addEventListener('click', ()=>{
        const event = EventCustom('/doces')
        main.dispatchEvent(event)   
    }) 
  

    const brigadeiros  = document.createElement('button')
    brigadeiros.textContent = "Brigadeiros"
    brigadeiros.addEventListener('click', ()=>{
        const event = EventCustom('/brigadeiros')
        main.dispatchEvent(event)    
    })


    const cupcakes  = document.createElement('button')
    cupcakes.textContent = "Cupcakes"
    cupcakes.addEventListener('click', ()=>{
        const event = EventCustom('/cupcakes')
        main.dispatchEvent(event)   
    })
   

    container.appendChild(H1);
    container.appendChild(doces);
    container.appendChild(brigadeiros);
    container.appendChild(cupcakes);


    return container;
}
