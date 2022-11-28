import Home from "./template/home.js"

import Route from "./template/route.js"

const rota = Route()
const main = document.querySelector("#root")

main.addEventListener('onstatechange', function(event){
    main.innerHTML = ``
    const url =  event.detail.url
    main.appendChild(rota.getPages(url))
    window.history.pushState('','', url)
})

window.addEventListener('load', ()=>{
    main.appendChild(rota.getPages('/'))    

})


