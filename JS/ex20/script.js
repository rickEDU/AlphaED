document.getElementById('cartela').style.cursor = 'pointer'

function Cartela(){
    let cartela = []
    
    function numeros_cartela(){
        let menor = 1   
        let maior = 75
        for(i=0;i<10;i++){
            let numRandom = Math.floor(Math.random() * (maior - menor + 1))+menor;
            while(verifica_numero_sorteado(numRandom)){
                numRandom = Math.floor(Math.random() * (maior - menor + 1))+menor;
            }

            cartela.push({"valor": numRandom, "mark": false})
        }
        
        return cartela;
    }

    function verifica_numero_sorteado(num){
        if(cartela.length===0){
            return false;
        }
        for(x of cartela){
            if(x.valor===num){
                return true;
            }
        }
        return false;
    }
    
    function marca_cartela(num){

        for(x of cartela){
            if(num===x.valor)
                return x.mark=true;
        }
        return false
    }

    function verifica_all_marcado(){
        let count=0;
        for(x of cartela){
            if(x.mark===true){
                count++
            }
        }
        if(count===10){
            return true;
        }else{
            return false;
        }
    }


    return {
        cartela,
        numeros_cartela,
        marca_cartela,
        verifica_all_marcado,
    }
}


function Sorteador(){
    let num_sorteados = []

    function sortear_numero(_minimo,_maximo){

        let numRandom = Math.floor(Math.random() * (_maximo - _minimo + 1))+_minimo;
        if(num_sorteados.length<75){
            while(verifica_numero_sorteado(numRandom)){
                numRandom = Math.floor(Math.random() * (_maximo - _minimo + 1))+_minimo;
            }
            num_sorteados.push(numRandom)
            return numRandom;
        }else{
            return `Não há mais números para serem sorteados`;
        }
    }

    function verifica_numero_sorteado(num){
        for(x of num_sorteados){
            if(x===num){
                return true;
            }
        }
        return false;
    }

    return {
        num_sorteados,
        sortear_numero,
    }
}

function input_quantidade_jogadores(){
    let inputJogador = document.getElementById('input')
    let number = document.createElement('input')
    number.type = 'number'
    number.id = 'quantidade_play'
    let botao = document.createElement('input')
    botao.type = 'button'
    botao.id = 'play'
    botao.value = 'jogar'
    botao.addEventListener('click', exibe_cartelas)
    inputJogador.appendChild(number)
    inputJogador.appendChild(botao)
}

function botao_reset(){
    let inputJogador = document.getElementById('input')
    let resetB = document.createElement('input')
    resetB.type = 'button'
    resetB.id = 'resetB'
    resetB.value = 'Reset'
    resetB.addEventListener('click', reset)
    inputJogador.appendChild(resetB)
}



function mostrar_globo(){
    let saida = document.getElementById("saidaSorteio")
    let saidaNumeros = document.getElementById("numeroSaida")
    let num = ``
    intervalo = setInterval(() => {
        num = sorteador.sortear_numero(1,75)
        retorno= `
        <p>
        ${num}
        </p>`
        let numeros_sorteados  = ``
        for(x of sorteador.num_sorteados){
            numeros_sorteados = numeros_sorteados+`<div class="bolinha">${x}</div>`
        }
        
        saida.innerHTML = numeros_sorteados
        saidaNumeros.innerHTML = retorno
        if(num===`Não há mais números para serem sorteados`){
            clearInterval(intervalo)
        }
    }, 5000);
}


function exibe_cartelas(){
    let quantidade = document.getElementById("quantidade_play").value
    if(jogo.length>0){
        jogo = []
    }
    for(i=0;i<quantidade;i++){
        jogo.push(new Cartela)

    }
    
    let root  =  document.getElementById("cartela")
    root.innerHTML = ``
    
    for(x of jogo){
        x.numeros_cartela()
    }
    let index = 0
    for(x of jogo){
        
        let cartela = document.createElement('div')
        cartela.className = 'cartela'
        let divLabel = document.createElement('div')
        let label = document.createElement('h3')
        label.textContent = `Cartela${index+1}`
        root.appendChild(cartela)
        divLabel.appendChild(label)
        cartela.appendChild(divLabel)  

        let divNumber = document.createElement('div')
        divNumber.className = 'numerosCartela'
        for(y of x.cartela){
            let cell = document.createElement('div')
            cell.className = 'cell'
            cell.textContent = y.valor
            cell.value = y.valor
            cell.id = index
            cell.addEventListener('click', click)
            divNumber.appendChild(cell)

        }
        
        cartela.appendChild(divNumber)
        index++
    }

    removeInput()
    botao_reset()
}


function removeInput(){
    const input = document.getElementById("quantidade_play")
    const button = document.getElementById("play")
   
    input.remove()
    button.remove()
    
}

function reset(){
    document.getElementById("cartela").innerHTML = ``
    document.getElementById("saidaSorteio").innerHTML = ``
    document.getElementById("numeroSaida").innerHTML = ``
    sorteador = new Sorteador()
    clearInterval(intervalo)
    const reset = document.getElementById("resetB")
    reset.remove()
    input_quantidade_jogadores()

}

function click(e){
    let cell = e.target
    let valor = cell.value
    for(x of sorteador.num_sorteados){
        if(x===valor){
            let id = parseInt(cell.id)
            e.target.classList.remove('cell')
            e.target.classList.add('marcado')
            jogo[id].marca_cartela(x)
            if(jogo[id].verifica_all_marcado()){
                clearInterval(intervalo)
                document.getElementById('cartela').innerHTML = `
                <h2>Jogador ${id+1} é o vencedor</h2>`
            }
        }
    }
}


input_quantidade_jogadores()
let sorteador = Sorteador()
let intervalo = ""
jogo = []
