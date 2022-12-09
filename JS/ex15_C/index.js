let minuto = document.getElementById("minuto");
let segundo = document.getElementById("segundo");
let card = document.getElementById("row");
let som = document.getElementById("som")

let timeInterval = ``;
let time = ``;
let timeColor = ``;
let timeRemove = ``;

for(let i=0;i<60;i++){
    let opM = document.createElement('option');
    opM.value = i;
    opM.textContent=i;
    let opS = document.createElement('option');
    opS.value = i;
    opS.textContent=i;
    minuto.appendChild(opM);
    segundo.appendChild(opS);
}

window.addEventListener('load', ()=>{
    btIniciar();
})


const btIniciar = ()=>{
    document.getElementById("saida").innerHTML =  ``;
    document.getElementById("botao").innerHTML =  ``;
    let campoBt = document.getElementById("botao");
    let botao = document.createElement('input');
    botao.type = 'button';
    botao.value = 'Iniciar';
    botao.classList.add('botao');
    botao.addEventListener('click', armarAlarme);
    campoBt.appendChild(botao);
}

const btPausar = ()=>{
    document.getElementById("botao").innerHTML =  ``;
    let campoBt = document.getElementById("botao");
    let botao = document.createElement('input');
    botao.type = 'button';
    botao.value = 'Desarmar';
    botao.classList.add('botao');
    botao.addEventListener('click', pausarAlarme);
    campoBt.appendChild(botao);
}

const armarAlarme = ()=>{
    minutoValor = parseInt(minuto.value);
    segundoValor = parseInt(segundo.value);
    i=minutoValor*60+segundoValor;
    let valor = minutoValor*60000+segundoValor*1000;
    trocaCor(valor)
    timeInterval = setInterval(function(){
        document.getElementById('saida').innerHTML = `Faltam ${tempoFormatado(i)} segundos`;
        parada(i);
        i--;
    },1000);
    time = setTimeout(alarme, valor);
    btPausar();
}

const pausarAlarme = ()=>{
    clearInterval(timeInterval);
    clearTimeout(time);
    clearTimeout(timeColor);
    clearTimeout(timeRemove);
    som.pause();
    card.classList.remove('menos')
    btIniciar();
}

const alarme = ()=>{
    setTimeout(function(){somAlarme()},1000);
}

const somAlarme = ()=>{
    som.play();
}

const tempoFormatado = (valor)=>{
    let minutos = Math.floor(valor/60);
    let segundos = valor%60;
    if(segundos<10){
        retorno = `${minutos}:0${segundos}`;
    }else{
        retorno = `${minutos}:${segundos}`;
    }
    return retorno;
}

const parada = (i) =>{
    if(i===0){
        timeRemove = setTimeout(function(){btIniciar(), card.classList.remove('menos')}, 8000) ;
        clearInterval(timeInterval);
        document.getElementById('saida').innerHTML = `Acorda pra vida!`;
    }
}

const trocaCor = (valor) =>{
    valor = valor - valor*0.05;
    timeColor = setTimeout(addClass, valor);
}

const addClass = () =>{
    setTimeout(function(){card.classList.add('menos')},1000);
}