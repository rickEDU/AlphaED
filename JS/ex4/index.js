function calcula_IMC(){
    let peso = document.querySelector("#valorPeso").value
    let altura = document.querySelector("#valorAltura").value
    peso = parseFloat(peso)
    altura = parseFloat(altura)
    let imc = peso/altura**2
    if (isNaN(peso) || isNaN(altura)){
        document.getElementById("saida").innerHTML = `<strong>ERRO, informe somente números</strong>`
    }else if (imc>40){
        document.getElementById("saida").innerHTML = `Você está com obesidade grave com imc igual a : ${imc.toFixed(2)} `;
    }else if (imc>30){
        document.getElementById("saida").innerHTML = `Você está com obesidade com IMC igual a : ${imc.toFixed(2)} `;
    }else if (imc>=18.5 && imc<=24.9){
        document.getElementById("saida").innerHTML = `Você está com o peso ideal com ${imc.toFixed(2)} `;
    }else{
        document.getElementById("saida").innerHTML = `Você está abaixo do peso ideal com IMC igual a :${imc.toFixed(2)} `;
    }
}

function numRandom(){
    let menor = document.querySelector("#numMenor").value
    let maior = document.querySelector("#numMaior").value
    menor = parseFloat(menor)
    maior = parseFloat(maior)
    if (isNaN(menor) || isNaN(maior)){
        document.querySelector("#saida2").textContent = "ERRO, Insira somente números!!"
    }else if (menor>maior){
        document.querySelector("#saida2").textContent = "Erro, Insira o número maior no campo correto !"
    }else{
        sorteio = Math.floor(Math.random() * (maior - menor + 1))+menor;
        document.querySelector("#saida2").textContent = `O valor sorteado foi : ${sorteio}`
    }
}

function imprime(){
    let num = document.querySelector("#numFloat").value
    num = parseFloat(num)
    if (isNaN(num)){
        document.querySelector("#saida3").textContent = "ERRO, Insira somente números!!"
    }else{
        let x = Math.floor(num)
        let y = Math.floor(num)+1
        document.querySelector("#saida3").innerHTML = `<p>O menor inteiro é: ${x}<br>  O maior inteiro é: ${y}</p>`
    }
}



