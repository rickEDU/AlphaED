// let produtos = [{
//     "id": "0",
//     "nome": "animalo",
//     "descricao": "teta",
//     "valor": "123",
//     "incluidoEm": ""
// }]
// console.log(produtos[0].valor)
let produtos = []
//<input type="button" id="incluir" value="Incluir Produto">
let produtoObj = {
    "id": "",
    "nome": "",
    "descricao": "",
    "valor": "",
    "incluidoEm": ""
}
let op = 0;

nome.addEventListener('input', function(){
    teste()
})
descricao.addEventListener('input', function(){
    teste()
})
valor.addEventListener('input', function(){
    valor.value = valor.value.replace(/[^0-9,]/, "")
    teste()
})


function teste(){
    
    if (nome.value!="" && descricao.value!="" && valor.value!="" && op===0)
        document.getElementById("incluir").innerHTML = `<input type="button" onclick="novoProduto()" id="incluir" value="Incluir Produto">`
    
}


function novoProduto(){

    let nome = document.getElementById("nome").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value

    produtoObj.id =  produtos.length
    produtoObj.nome = nome
    produtoObj.descricao = descricao
    produtoObj.valor = valor
    produtoObj.incluidoEm = new Date()
    produtos[produtos.length] = produtoObj

    document.getElementById("nome").value = ``
    document.getElementById("descricao").value = ``
    document.getElementById("valor").value = ``
    document.getElementById("incluir").innerHTML = ``
    console.log(produtos)
}

function listarProdutos(){
    document.getElementById("listaTable").innerHTML = `
      <table>
        <tr>
          <th id="cabeca" onclick="escolhaOrdenaNM(t)">Id</th>
          <th id="cabeca" onclick="escolhaOrdenaATK(a)">Produto</th>
          <th id="cabeca" onclick="escolhaOrdenaDEF(a)">Valor</th>
          <th id="cabeca">Editar</th>
          <th id="cabeca">Apagar</th>
        </tr>${bodyTable()}
      </table>`
  }

function bodyTable(){
    return produtos.map(f => `
    <div>
        <tr>
            <th>
            ${f.id}
            </th>
            <th>
            ${f.nome}
            </th>
            <th>
            ${f.valor}
            </th>         
            <th>
            ${exibeEditar(f.id)}
            </th>
            <th>
            ${exibeDeletar(f.id)}
            </th>

        </tr>
    </div>`)
}

function exibeEditar(id){
   return `<a onclick="editar(${id})">Editar</a>`
}
function editar(id){
    document.getElementById("nome").value = produtos[id].nome
    document.getElementById("descricao").value = produtos[id].descricao
    document.getElementById("valor").value = produtos[id].valor
    document.getElementById("incluir").innerHTML = `<input type="button" onclick="salvar(${id})" value="Salvar">`
    op = 1;
    
}

function salvar(id){
    produtos[id].nome = document.getElementById("nome").value
    produtos[id].descricao = document.getElementById("descricao").value
    produtos[id].valor = document.getElementById("valor").value
    listarProdutos()
    document.getElementById("nome").value = ``
    document.getElementById("descricao").value = ``
    document.getElementById("valor").value = ``
    document.getElementById("incluir").innerHTML = ``
    op = 0;

}

function exibeDeletar(id){
   return `<a onclick="deletar(${id})">deletar</a>`
}

function deletar(id){
}