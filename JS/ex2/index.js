function comparaNum(){
    let num1= document.querySelector("#num1").value
    let num2= document.querySelector("#num2").value
    if(isNaN(num1)|| isNaN(num2)){
        document.querySelector("#saida").textContent = "ERRO!! Insira somente números"
    }else if (num1>num2){
        document.querySelector("#saida").textContent = `valor 1(${num1}) é maior que o valor 2(${num2})`
    }else if (num1<num2){
        document.querySelector("#saida").textContent = `valor 1(${num1}) é menor que o valor 2(${num2})`
    }else if (num1===num2){
        document.querySelector("#saida").textContent = `valor 1(${num1}) é igual que o valor 2(${num2})`
    }
}

function comparaString (){
    entrada1= document.getElementById("entrada1").value
    entrada2= document.getElementById("entrada2").value
    if (entrada1.length>entrada2.length){
        document.getElementById("saida2").innerHTML= "A primeira palavra é maior que a segunda.";
    }else if (entrada1.length<entrada2.length){
        document.getElementById("saida2").innerHTML= "A segunda palavra é maior que a primeira.";
    }else{
        document.getElementById("saida2").innerHTML= "As duas palavras tem o mesmo tamanho.";
    }
}
