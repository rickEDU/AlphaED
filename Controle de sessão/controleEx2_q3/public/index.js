import router from "../router.js";
import EventCustom from "./eventCustom.js";

const root = document.querySelector(".root");

root.addEventListener("onstatechange", function (event) {
    const url = event.detail.url;
    const data = event.detail.data

    window.history.pushState("", "", url);

    router(url, data)  

});

window.addEventListener("load", () => {
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
        const evento =  EventCustom('/login', data.data.user)
        root.dispatchEvent(evento);
    })
    .catch(error =>{
        router('/')
        console.log(error)
    })
    
});