
let vetor = ['https://moveissimonetti.vteximg.com.br/arquivos/ids/8093969-300-300/60512.jpg?v=636947523480530000',
    'https://consul.vtexassets.com/arquivos/ids/230224-800-auto?v=637980615219600000&width=800&height=auto&aspect=true',
'https://a-static.mlcdn.com.br/1500x1500/mesa-de-jantar-4-cadeiras-retangular-rufato-berlim-melis/magazineluiza/224805200/7bc6cb71c861e3e621e9683a3874357a.jpg',
'https://a-static.mlcdn.com.br/800x560/sofa-de-canto-confortable-retratil-e-reclinavel-5-lugares-2-80-x-2-20-pillow-mola-1-tok-estofados/1tokestofados/sfc280220/844f602e71868ac75b1d1fd14978c553.jpg',
'https://www.filhao.com.br/produtos/imagens/26145-det-Cama-Solteiro-Santos-Andira-Invicta.jpg']


function imprimirProd(){
    let operador = document.querySelector("#op").value
    operador = parseInt(operador)
    switch (operador){
        case 1: 
            document.getElementById("saida").innerHTML = `<img src="${vetor[operador-1]}"  width="150px"/>`
        case 2: 
            document.getElementById("saida").innerHTML = `<img src="${vetor[operador-1]}"  width="150px"/>`
        case 3: 
            document.getElementById("saida").innerHTML = `<img src="${vetor[operador-1]}"  width="150px"/>`
        case 4: 
            document.getElementById("saida").innerHTML = `<img src="${vetor[operador-1]}"  width="150px"/>`
        case 5: 
            document.getElementById("saida").innerHTML = `<img src="${vetor[operador-1]}"  width="150px"/>`
        default: 
            document.getElementById("saida").innerHTML = `<p></p>`
    }
}

