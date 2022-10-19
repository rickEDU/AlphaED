
function imprime (){
    entrada= document.getElementById("entrada")
    valor= entrada.value
    if (valor.length>=3){
        y="<strong>palavra:</strong>"+valor+"<br><strong>tamanho:</strong>"+valor.length       
        x = document.getElementById("saida").innerHTML = y;
    }else{
        z="tem menos de 3 caracteres"
        document.getElementById("saida").innerHTML = z;
    }
}
