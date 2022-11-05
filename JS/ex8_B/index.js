botao.addEventListener('click', function(){
    let erro = false;
    let valor = document.getElementById("entrada").value 
    try{
        valor = JSON.parse(valor)
        console.log(valor)

    }catch(e){
        erro=true;
        console.log(e)
    }

    if (erro===true){
       document.getElementById("saida").innerHTML = `Erro! Unparsable JSON string!`
    }else{
        document.getElementById("saida").innerHTML = `Parsable JSON string!`
    }
})