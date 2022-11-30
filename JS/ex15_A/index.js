
const ticTac = document.getElementById("tic");
const explosion = document.getElementById("explosion");
let timer = ``;
let intervalo = ``;
let blockBt = 0;
let block = 0;

window.addEventListener('load', ()=>{
    imagem('./imagens/bomb.png')
})

function explosão(){
    imagem('./imagens/explosion.png')
}

function desarmada(){
    imagem('./imagens/bomb.png')
    parada(11)
}

armarBomba.addEventListener('click', ()=>{
    if(blockBt===0){
        imagem('./imagens/bombAcesa.png')
        timer = setTimeout(explosão, 10000)
        document.getElementById("saida").innerHTML = ``
        tempoRestante()
        blockBt = 1;
        block = 0;
    }else{
        return;
    }
})


function tempoRestante(){
    let i = 1;
    intervalo = setInterval(function(){
        if(i<10){
            ticTac.play()
        }
        document.getElementById("saida").innerHTML = `<h3>${i} segundos</h3>`
        parada(i)
        i++;
    }, 1000)
}

function parada(i){
    if(i===10){
        blockBt = 0;
        block = 1;
        explosion.play()
        clearInterval(intervalo)
        clearTimeout(timer)
    }
    if(i===11){
        clearInterval(intervalo)
        clearTimeout(timer)
    }
}


function imagem(url){
    let imagem = document.getElementById("bomba")
    imagem.innerHTML = ``

    const bomba = document.createElement('img')
    bomba.src = url
    bomba.classList.add('imagem')
    bomba.addEventListener('click', function(){
        if(block===0){
            desarmada()
            blockBt = 0;
            block = 1;
        }else{
            return;
        }
    })

    imagem.appendChild(bomba)

}