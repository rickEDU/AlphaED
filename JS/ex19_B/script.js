
const deck = async() =>{
    let requisicao = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    if(requisicao.status!=200){
        throw `ERRO NA REQUISIÇÃO DO DECK`
    }

    let json = await requisicao.json()
    let retorno = json.deck_id
    return retorno
}


const card = async(id) =>{
    let requisicao = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
    if(requisicao.status!=200){
        throw `ERRO NA REQUISIÇÃO DA CARTA`
    }
    let json = await requisicao.json()
    let retorno = json.cards[0].image
    return retorno;
}

const draw = async ()=>{
    cursorWait()
    try{
        let deckID = await deck()
        let cartas = []
        for(let i=0;i<5;i++){
            cartas.push(card(deckID))
        }
        let vetorRetorno = await Promise.all(cartas)
        exibe(vetorRetorno)
    }catch(e){
        console.log(e)
        exibeErro(e)
    }

}

const exibe = async (hand) =>{
    let saida  = document.getElementById("saida");
    retorno = ``;
    for(let i=0;i<hand.length;i++){
        retorno = retorno+`<img width="150px" src="${hand[i]}"/>`;
    }
    cursorDefault()
    saida.innerHTML = `${retorno}`;
}

const exibeErro = (e)=>{
    document.getElementById("saida").innerHTML = `<h2>Ocorreu um erro: ${e}</h2>`
}

const cursorWait = ()=>{
    document.body.style.cursor = "wait"
    document.getElementById("compra").style.cursor = "wait"
    document.getElementById("saida").style.cursor = "wait"
}

const cursorDefault = ()=>{
    document.body.style.cursor = "default"
    document.getElementById("compra").style.cursor = "default"
    document.getElementById("saida").style.cursor = "default"
}
    