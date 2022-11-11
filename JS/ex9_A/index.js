entrada1.addEventListener('input', function(){
    entrada1.value = onlyNumber(entrada1.value);
})

entrada2.addEventListener('input', function(){
    entrada2.value = onlyNumber(entrada2.value);
})

function onlyNumber(x){
    x = x.replace(/[^0-9,.-]/g, "");
    x = x.replace(/,/g, ".");
    return x;
}


// verifica se o valor inserido é um número mesmo ou se o usuário esqueceu de digitar algum valor, se sim, ele envia um
function validaNum(x){
    if (isNaN(x) || x===""){
        throw 'ERRO! entrada inválida.'
    }
}


function soma(num1, num2){
    try{
        validaNum(num1)        
        validaNum(num2)        
    }catch(e){
        console.log(e)
        return document.getElementById("saida").innerHTML = `<div>${e}</div>`;
    }

    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    resultado = num1+num2
    
    return document.getElementById("saida").innerHTML = `<div>Resultado da soma: ${resultado}</div>`;
}

function subtracao(num1, num2){
    try{
        validaNum(num1)        
        validaNum(num2)        
    }catch(e){
        console.log(e)
        return document.getElementById("saida").innerHTML = `<div>${e}</div>`;
    }
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    resultado = num1-num2

    return document.getElementById("saida").innerHTML = `<div>Resultado da subtração: ${resultado}</div>`;
}

function multiplicacao(num1, num2){
    try{
        validaNum(num1)        
        validaNum(num2)        
    }catch(e){
        console.log(e)
        return document.getElementById("saida").innerHTML = `<div>${e}</div>`;
    }
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    resultado = num1*num2

    return document.getElementById("saida").innerHTML = `<div>Resultado da multiplicação: ${resultado}</div>`;
}

function divisao(num1, num2){
    try{
        validaNum(num1)        
        validaNum(num2)        
    }catch(e){
        console.log(e)
        return document.getElementById("saida").innerHTML = `<div>${e}</div>`;
    }
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    resultado = num1/num2

    return document.getElementById("saida").innerHTML = `<div>Resultado da divisão: ${resultado}</div>`;
}

function potencia(num1, num2){
    try{
        validaNum(num1)        
        validaNum(num2)        
    }catch(e){
        console.log(e)
        return document.getElementById("saida").innerHTML = `<div>${e}</div>`;
    }
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    resultado = num1**num2

    return document.getElementById("saida").innerHTML = `<div>Resultado da potenciação: ${resultado}</div>`;
}