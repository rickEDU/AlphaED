
function imprime (){
    entrada1= document.getElementById("entrada1").value
    entrada2= document.getElementById("entrada2").value
    if (entrada1.length>entrada2.length){
        document.getElementById("saida").innerHTML= "A primeira palavra é maior que a segunda.";
    }else if (entrada1.length<entrada2.length){
        document.getElementById("saida").innerHTML= "A segunda palavra é maior que a primeira.";
    }else{
        document.getElementById("saida").innerHTML= "As duas palavras tem o mesmo tamanho.";
    }
}
