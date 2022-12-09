//let deckID = ``
//let hand = []


const deck = async() =>{
    let requisicao = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    if(requisicao.status!=200){
        throw `ERRO NA REQUISIÇÃO DO DECK`
    }

    let resposta = await requisicao.json()
    let retorno = resposta.deck_id
    return retorno
}


const card = async(id) =>{
    let requisicao = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
    if(requisicao.status!=200){
        throw `ERRO NA REQUISIÇÃO DA CARTA`
    }
    let resposta = await requisicao.json()
    let retorno = resposta.cards[0].image
    return retorno;
}

const draw = async ()=>{
    cursorWait()
    try{
        let deckID = await deck()
        let retorno = []
        for(let i=0;i<5;i++){
            retorno.push(await card(deckID))
        }
        exibe(retorno)
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
    