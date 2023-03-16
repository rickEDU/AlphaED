import { renderInitial } from "./pages/login.js"
import { renderLoged } from "./pages/loged.js"
import { renderCadastro } from "./pages/create.js"

export default function router (url, data){
    if(url === "/"){
        renderInitial()
    }

    if(url === "/login"){
        renderLoged(data)
    }

    if(url === "/cadastro"){
        renderCadastro()
    }
}

