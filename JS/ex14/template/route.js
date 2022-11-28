import Home from "./home.js"
import Doces from "./doces.js"
import Brigadeiros from "./brigadeiros.js"
import Cupcakes from "./cupcakes.js"

export default function  Route(){
    const rota = {
        '/': Home(),
        '/brigadeiros': Brigadeiros(),
        '/cupcakes': Cupcakes(),
        '/doces': Doces(),
    
        getPages: function(url){
            return this[url]
        }
    }
    return rota;
}