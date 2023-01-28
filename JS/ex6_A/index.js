document.addEventListener('change', exibir);



function exibir(){
    let vetor = [
        {"nome": "512 Testarossa", "marca": "Ferrari", "velocidade": "350km/h", "img": "https://conteudo.imguol.com.br/c/entretenimento/9f/2017/12/15/ferrari-enzo-2002-1513371084432_v2_750x421.jpg.webp"},
        {"nome": "Uno", "marca": "Fiat", "velocidade": "50km/h", "img": "https://static2.meucarronovo.com.br/imagens-dinamicas/lista/fotos/veiculos/1073594/15933188/ePzEPwP4L.jpg"},
        {"nome": "Gol", "marca": "Volkswagen", "velocidade": "120km/h", "img": "https://garagem360.com.br/wp-content/uploads/2022/08/gol-1.jpg"},
        {"nome": "Marea", "marca": "Fiat", "velocidade": "275km/h", "img": "https://mundofixa.com/wp-content/uploads/2018/04/Imagem-003.jpg"},
        {"nome": "Fiesta", "marca": "Ford", "velocidade": "25km/h", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSZiQnkORvNokEDezoKUno01LLlmVomQ85cw&usqp=CAU"},
    ]
        
    let valor = document.getElementById("operador").value
    valor=parseInt(valor)

    if(valor===0){
        document.getElementById("imagem").innerHTML = `<p></p>`
        document.getElementById("saida").innerHTML = `<p></p>`
    }else{
        document.getElementById("imagem").innerHTML = `<img src="${vetor[valor-1].img}"  width="150px"/>`
        document.getElementById("saida").innerHTML = `
        <p>
            Nome do carro: ${vetor[valor-1].nome}<br>
            Marca: ${vetor[valor-1].marca}<br>
            Velocidade máxima: ${vetor[valor-1].velocidade}
        </p>`
    }
}