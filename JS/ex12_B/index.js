let naipe = ['C', 'D', 'H', 'S']
let valores = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']

vetorDeck = []

function criaDeck(){
    vetorDeck = []
    for(x of naipe){
        for(y of valores){
            let card = {"naipe": "", "valor": "", "img":""}
            card.naipe=x
            card.valor=y
            card.img = y+x+`.svg`
            vetorDeck.push(card);
        }
    }
    embaralhar();
}

function embaralhar(){
    for(let i=0; i<vetorDeck.length-1;i++){
        let menor = 0;
        let maior = vetorDeck.length-1;

        let j = Math.floor(Math.random() * (maior - menor + 1))+menor;
        let auxiliar = vetorDeck[j];
        vetorDeck[j] = vetorDeck[i];
        vetorDeck[i] = auxiliar;
    }
    jogadorMao()
}


function jogadorMao(){

    let card1 = vetorDeck[0];
    let card2 = vetorDeck[1];
    let card3 = vetorDeck[2];
    let card4 = vetorDeck[3];
    let card5 = vetorDeck[4];

    let aux = `
    <img src="deck/${card1.img}" alt="" width="150px">
    <img src="deck/${card2.img}" alt="" width="150px">
    <img src="deck/${card3.img}" alt="" width="150px">
    <img src="deck/${card4.img}" alt="" width="150px">
    <img src="deck/${card5.img}" alt="" width="150px">
    `;

    
    document.getElementById("saida1").innerHTML = `${aux}`;
    retiraDeck();
    jogo(card1, card2, card3, card4, card5);
}


function retiraDeck(){
    vetorDeck.splice(0, 5);
    console.log(vetorDeck);
}

function jogo(card1, card2, card3, card4, card5){
    // verifica se na mão tem um par, 2 pares, uma trinca, uma quadra... e por aí vai.

    let vetor = [card1, card2, card3, card4, card5];

    // vetor de teste usado para situações como, Straight Flush, que é muito raro de acontecer, quadra, e sequencia.
    ////////////////
    // let vetor = [
    //     {"naipe": "H", "valor": "A", "img":"3C.svg"},
    //     {"naipe": "S", "valor": "2", "img":"2Ssvg"},
    //     {"naipe": "C", "valor": "3", "img":"5S.svg"},
    //     {"naipe": "D", "valor": "4", "img":"6H.svg"},
    //     {"naipe": "H", "valor": "5", "img":"4D.svg"}]

    let count = testaPar(vetor);
    let posi = posicao(vetor)

    if(count===0){
        if(testaNaipe(vetor)){
            if(testaSequencia(vetor, posi)){
                document.getElementById("saida2").innerHTML = `Você fez um <strong>STRAIGHT FLUSH</strong>`;
            }
        }else if(testaSequencia(vetor, posi)){
            document.getElementById("saida2").innerHTML = `Você fez uma <strong>SEQUENCIA</strong>`;

        }else{
            document.getElementById("saida2").innerHTML = `Você fez <strong>NADA</strong>`;
        }
    }else if(count===1){
        document.getElementById("saida2").innerHTML = `Você fez um <strong>PAR</strong>`;
    }else if(count===2){
        document.getElementById("saida2").innerHTML = `Você fez <strong>2 PARES</strong>`;       
    }else if (count===3){
        document.getElementById("saida2").innerHTML = `Você fez uma <strong>TRINCA</strong>`;
    }else if (count===4){
        document.getElementById("saida2").innerHTML = `Você fez um <strong>FULL HOUSE</strong>`;
    }else if(count===6){
        document.getElementById("saida2").innerHTML = `Você fez uma <strong>QUADRA</strong>`;
    }

}

function testaPar(vetor){
    // verifica se tem algum par na mão.
    let count = 0;
    for(i=0; i<vetor.length;i++){
        for(j=i+1;j<vetor.length; j++){
            if(vetor[i].valor===vetor[j].valor){
                count++;
            }
        }
    }
    return count;
}

function posicao(vetor){
    // retorna a posição da carta de menor valor na mão. se for um 2, vai retornar 0 que é a posição do 2 lá no vetor "valores"
    // uso o retorno dessa função para saber se tem uma sequencia na mão.
    for(let j=0; j<valores.length; j++){
        for(let i=0;i<vetor.length;i++)
        if(vetor[i].valor===valores[j]){
            return j;
        }
    }
}

function testaNaipe(vetor){
    // verifica se todas as cartas são do mesmo naipe.
    let count =0
    for(i=0;i<vetor.length-1;i++){
        if (vetor[i].naipe===vetor[i+1].naipe){
            count++
        }
    }

    if(count===4){
        return true;
    }else{
        return false;
    }
}


function testaSequencia(vetor, posi){
    // verifica se as cartas da que estão no vetor é uma sequencia.
    let count = 0;
    let aux = posi;
    let aux2 = posi+5;
    if(posi===0){
        for(x of vetor){
            if(x.valor==="A"){
                count++;
                aux2--;
            }
        }
    }
    for(i=aux;i<aux2;i++){
        for(x of vetor){
            if(valores[i]===x.valor){
                count++;
            }
        }
    }

    if(count===5){
        return true;
    }else{
        return false;
    }
}