function resultado(){
    let num1= document.querySelector("#num1").value
    let num2= document.querySelector("#num2").value
    num1=parseFloat(num1)
    num2=parseFloat(num2)
    let op= document.querySelector("#operador").value 

    if (op==="soma"){
        let saida = num1+num2
        document.querySelector("#saida").innerHTML = `O resultado foi: ${saida}`;
        console.log("O resultado foi: ", saida)
    }else if(op==="sub"){
        let saida = num1-num2
        document.querySelector("#saida").innerHTML = `O resultado foi: ${saida}`;
        console.log("O resultado foi: ", saida)
    }else if(op==="divisao"){
        let saida = num1/num2
        document.querySelector("#saida").innerHTML = `O resultado foi: ${saida}`;
        console.log("O resultado foi: ", saida)   
    }else{
        let saida = num1*num2
        document.querySelector("#saida").innerHTML = `O resultado foi: ${saida}`;
        console.log("O resultado foi: ", saida)
    }
}