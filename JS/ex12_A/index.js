let valor = 100000;
function numPrimo(){
    let auxiliar = [];
    for(let i=0; i<valor;i++){
        if(i===1){
            // Faz nada, pois o número não é um número primo
        }else if(i<10 && ((i===2) || (i===3) || (i===5) || (i===7))){
            auxiliar.push(i)
        }else if((i%2===0) || (i%3===0) || (i%5===0) || (i%7===0)){ 
            // Faz nada, pois o número não é um número primo
        }else{
            auxiliar.push(i)
        }
    }
    console.log(auxiliar)
    ////
    ////// eu ia exibir na tela, mas fica muito feio, só vou por o vetor no console da página mesmo.
    ////


    //aux = `${auxiliar.slice(0,25)}`

    // for (i=25; i<auxiliar.length; i+=17){
    //     aux=aux+`<br>${auxiliar.slice(i,i+17)}`
    // }


    document.getElementById("saida").innerHTML = `De 0 até 100000 tem ${auxiliar.length} números primos.`

}

numPrimo()