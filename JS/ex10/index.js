// se já existir um produto cadastrado com o nome, impedir o cadastro.

let produtos = []


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
    let nome = document.getElementById("nome").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value

    if (nome!="" && descricao!="" && valor!="" && op===0){
        document.getElementById("incluir").innerHTML = `<input type="button" onclick="novoProduto()" id="incluir" value="Incluir Produto">`
    }else if(op===0){
        document.getElementById("incluir").innerHTML = ``
    }
    
}

function validaProd(nome){
    let i = 0;
    while(i<produtos.length){
        if (produtos[i].nome===nome){
            console.log("erro:", i)
            throw `ERRO! O produto ${nome} já está cadastrado!`;
        }
        i++;
    }
}


function novoProduto(){
    let produtoObj = {
        "id": "",
        "nome": "",
        "descricao": "",
        "valor": "",
        "incluidoEm": "",
    }

    let nome = document.getElementById("nome").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value
    try{
        validaProd(nome)
    }catch(e){
        return document.getElementById("saida").innerHTML = `${e}`
    }

    produtoObj.id =  produtos.length
    produtoObj.nome = nome
    produtoObj.descricao = descricao
    produtoObj.valor = valor

    let dataF = new Date()
    dataF.setHours(dataF.getHours()-3)
    
    produtoObj.incluidoEm = dataF.toISOString()
    produtos.push(produtoObj)

    apagaCampo()
    document.getElementById("saida").innerHTML = `Produto ${produtoObj.nome} incluído com sucesso!`
    console.log(produtos)
}

function listarProdutos(){
    document.getElementById("saida").innerHTML = ``

    document.getElementById("listaTable").innerHTML = `
      <table>
        <tr>
          <th id="cabeca">Id</th>
          <th id="cabeca">Produto</th>
          <th id="cabeca">Valor</th>
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
            <a onclick="exibirInfo(${f.id})">${f.nome}</a>
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
    </div>`).join('')
}


function exibirInfo(id){
    let i = 0;
    while(i<produtos.length){
        if (produtos[i].id===id){
            return document.getElementById("listaTable").innerHTML = `
            ID: ${produtos[i].id}<br>
            Nome: ${produtos[i].nome}<br>
            Descrição: ${produtos[i].descricao}<br>
            Valor: ${produtos[i].valor}<br>
            Data de cadastro: ${dataFormatada(produtos[i].incluidoEm)}
            `
        }
        i++;
    }
}

function dataFormatada(data){
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    return `${data.slice(8,10)} de ${meses[data.slice(5,7)-1]} de ${data.slice(0,4)}, Produto salvo as: ${data.slice(11,19)}` 
}


function exibeEditar(id){
   return `<a onclick="editar(${id})">Editar</a>`
}
function editar(id){
    let i=0;
    op = 1;
    while (i<produtos.length){
        if(produtos[i].id===id){
            document.getElementById("nome").value = produtos[i].nome
            document.getElementById("descricao").value = produtos[i].descricao
            document.getElementById("valor").value = produtos[i].valor
            document.getElementById("incluir").innerHTML = `<input type="button" onclick="salvar(${i})" value="Salvar">`
            document.getElementById("cancelar").innerHTML = `<input type="button" onclick= "cancela()" value="Cancelar">`
            
        }
        i++;
    }
    
}

function salvar(id){
    produtos[id].nome = document.getElementById("nome").value
    produtos[id].descricao = document.getElementById("descricao").value
    produtos[id].valor = document.getElementById("valor").value
    listarProdutos()
    document.getElementById("incluir").innerHTML = ``
    document.getElementById("cancelar").innerHTML = ``
    apagaCampo()
    op = 0;

}

function cancela(){
    op = 0;
    apagaCampo()
    document.getElementById("incluir").innerHTML = ``
    document.getElementById("cancelar").innerHTML = ``
}

function exibeDeletar(id){
    return `<a onclick="deletar(${id})">deletar</a>`
}

function deletar(id){
    op = 0;
    let i=0;
    while (i<produtos.length){
        if(produtos[i].id===id){
            produtos.splice(produtos.indexOf(produtos[i]), 1)
        }
        i++;
    }
    apagaCampo()
    document.getElementById("cancelar").innerHTML = ``
    listarProdutos()
}

function apagaCampo(){
    document.getElementById("nome").value = ``
    document.getElementById("descricao").value = ``
    document.getElementById("valor").value = ``
    document.getElementById("incluir").innerHTML = ``
}