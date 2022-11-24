let matrix = [["","",""],["","",""],["","",""]];

let jogador = 'X';


let tabuleiro = document.querySelectorAll(".elemento")

for(x of tabuleiro){
    x.value=''
}

function escolhaClick(e){

    let cell = e.target
    if(block(cell) || testeVitoria('X') || testeVitoria('O')){
        return false;
    }
    i = cell.dataset.value[0]
    j = cell.dataset.value[1]
    matrix[i][j] = jogador
    cell.textContent = jogador

    if(jogador==='X'){ 
        cell.value = 'X'
        cell.classList.add("x")
        if(testeVitoria('X')){
            mudaCor(vitoriaCor('X'))
            return document.querySelector("#saida").innerHTML = `<p class="vencedorX">O jogador 'X' é o vencedor</p>`
        }
        jogador='O'
    }else{
        cell.value = 'O'
        cell.classList.add("O")
        if(testeVitoria('O')){
            mudaCor(vitoriaCor('O'))
            return document.querySelector("#saida").innerHTML = `<p class="vencedorO">O jogador 'O' é o vencedor</p>`
        }
        jogador='X'
    }
    if(testeVelha()){
        for(x of tabuleiro){
            x.classList.remove('x','O')
            x.classList.add('velha')
        }
        return document.querySelector("#saida").innerHTML = `<p>Deu Velha</p>`
    }
    console.log(matrix)
}


const vitoria = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function block(cell){
    if(cell.value==='X' || cell.value==='O'){
        return true;
    }else{
        return false;
    }
}


function testeVelha(){
    for(x of tabuleiro){
        if(x.value===''){
            return false;
        }
    }
    return true;
}

function testeVitoria(variavel){
    count=0;
    for(x of vitoria){
        for(y of x){
            if(tabuleiro[y].value===variavel){
                count++
            }
        }if (count===3){
            return true;
        }else{
            count=0
        }
    }
    return false;
}


// acha as posições da que ocorreu a vitória
function vitoriaCor(variavel){
    count=0;
    for(x of vitoria){
        for(y of x){
            if(tabuleiro[y].value===variavel){
                count++
            }
        }
        if(count===3){
            return x;
        }else{
            count=0
        }
    }
}

function mudaCor(vetor){
    for(x of vetor){
        tabuleiro[x].classList.remove('x', 'O')
        tabuleiro[x].classList.add('vitoria')
    }
}


botao.addEventListener('click', function(){
    matrix = [['','',''],['','',''],['','','']]
    for(x of tabuleiro){
        x.classList.remove('x','O', 'vitoria', 'velha')
        x.value = ``
        x.textContent = ``
    }
    document.querySelector("#saida").innerHTML = ``
    jogador = 'X'

})

for(let celula of tabuleiro){
    celula.addEventListener('click', escolhaClick)
}



console.log(tabuleiro)