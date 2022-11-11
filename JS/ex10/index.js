
let produtos = []
let ID = 0;
let op = 0;

nome.addEventListener('input', function(){
    teste()
})
descricao.addEventListener('input', function(){
    teste()
})
valor.addEventListener('input', function(){
    //valor.value = valor.value.replace(/,/, ".")
    teste()
})


function teste(){
    let nome = document.getElementById("nome").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value

    if (nome!="" && descricao!="" && valor!="" && op===0){
        document.getElementById("incluir").innerHTML = `<input type="button" class="botaoSalvar" onclick="novoProduto()" id="incluir" value="Incluir Produto">`
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

    produtoObj.id =  ID
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
    ID++;
}

function listarProdutos(){
    if (produtos.length<1){
        document.getElementById("listaTable").innerHTML = ``
        return     document.getElementById("saida").innerHTML = `<p>Não há produtos cadastrados para mostrar.</p>`

    }
    document.getElementById("saida").innerHTML = ``
    document.getElementById("listaTable").innerHTML = ``
    document.getElementById("listaTable").innerHTML = `           
        <table id="listaTable">
            <tr>
                <th id="cabeca">Id</th>
                <th id="cabeca">Produto</th>
                <th id="cabeca">Valor</th>
                <th id="cabeca">Editar</th>
                <th id="cabeca">Apagar</th>
            </tr>
        </table>`;
    let tableB = document.getElementById("listaTable");
    let i = 0;
    while(i<produtos.length){
        let row = tableB.insertRow()
        let idCel = row.insertCell()
        let nomeCel = row.insertCell()
        let valorCel = row.insertCell()
        let editCel = row.insertCell()
        let deleteCel = row.insertCell()

        idCel.innerHTML  = produtos[i].id
        nomeCel.innerHTML  = `<a onclick="exibirInfo(${produtos[i].id})" class="nomeClick" >${produtos[i].nome}</a>`
        valorCel.innerHTML  = produtos[i].valor
        editCel.innerHTML  = `${exibeEditar(produtos[i].id)}`
        deleteCel.innerHTML  = `${exibeDeletar(produtos[i].id)}`
        i++;
    }
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
    //ia usar esse vetor para mostrar o mês por extenso, mas a questão só quer os números separados por "/"
    //let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    return `${cortar(data,8,10)}/${cortar(data,5,7)}/${cortar(data,0,4)} - ${cortar(data,11,19)}` 
}

// Já que não posso usar o slice, eu programo um método que faz a mesma coisa KKKKKK.
function cortar(data,a,b){
    let completo= ``;
    while(a<b){
        completo = completo+data[a]

        a++;
    }
    return completo;
}

function exibeEditar(id){
   return `<a onclick="editar(${id})"><img src="editar.png" width="25px"></a>`
}
function editar(id){
    let i=0;
    op = 1;
    while (i<produtos.length){
        if(produtos[i].id===id){
            document.getElementById("nome").value = produtos[i].nome
            document.getElementById("descricao").value = produtos[i].descricao
            document.getElementById("valor").value = produtos[i].valor
            document.getElementById("incluir").innerHTML = `<input type="button"  class="botaoSalvar" onclick="salvar(${i})" value="Salvar">`
            document.getElementById("cancelar").innerHTML = `<input type="button" class="botaoCancelar" onclick= "cancela()" value="Cancelar">`
            
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
    return `<a onclick="deletar(${id})"><img src="lixeira.png" width="25px"></a>`
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