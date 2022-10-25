function imprimir(){
    let valor = document.querySelector("#entrada").value
    valor=parseInt(valor)

    switch(valor){
        case 0:
            document.querySelector("#saida").textContent = `Saída : ${valor}`
            break;
        case 1:
            document.querySelector("#saida").textContent = `Saída : ${valor}`
            break;
        case 2:
            document.querySelector("#saida").textContent = `Saída : ${valor}`
            break;
        case 3:
            document.querySelector("#saida").textContent = `Saída : ${valor}`
            break;
        case 4:
            document.querySelector("#saida").textContent = `Saída : ${valor}`
            break;
        case 5:
            document.querySelector("#saida").textContent = `Saída : ${valor}`
            break;
        case 6:
            document.querySelector("#saida").textContent = `Saída : ${valor}`
            break;
        case 7:
            document.querySelector("#saida").textContent = `Saída : ${valor}`
            break;
        case 8:
            document.querySelector("#saida").textContent = `Saída : ${valor}`
            break;
        case 9:
            document.querySelector("#saida").textContent = `Saída : ${valor}`
            break;
        case 10:
            document.querySelector("#saida").textContent = `Saída : ${valor}`
            break;
        default:
            document.querySelector("#saida").textContent = "ERRO!! Insira um número entre 0 e 10";
    }
}