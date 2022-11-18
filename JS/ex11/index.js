
let produtos = []
let auxiliar = []
//op, n, v são variáveis de controle de funções para exibição ou ordenamento.

let ID = 0;
let op = 0;
let n = 1;
let v = 1;
let input =0;


nome.addEventListener('input', function(){
    teste()
})
descricao.addEventListener('input', function(){
    teste()
})


valor.addEventListener('input', function(){
    if(input===1){
        valor.value = valor.value.slice(3)
    }else if (input===2){
        valor.value = valor.value.slice(2)
    }
    
    valor.value =  valor.value.replace(/[^0-9]/, "")
    
    valor.value = mascaraValor(valor.value)
    teste()
})

function mascaraValor(valor){
    valor.replace(/,/,"")
    let aux = "0,00"
    if(input==0 && valor===/[^0-9]/){
        input++;
        aux = aux.slice(0,3)+valor
        return aux
    }else if(input===1){
        input++;
        return aux = aux.slice(0,2)+valor
    }else if(input===2 && valor.length>2){
        input++
        return aux = valor.slice(0,1)+","+valor.slice(1)
    }else if(valor.length<1){
        input=0
        return aux = ""
    }else if(valor.length<3){
        input=2;
        return aux =  "0,"+valor.slice(-2)
    }else if(input>2){
        let aux2 = (valor.length)-2
        return aux = valor.slice(0,aux2)+","+valor.slice(-2)
    }
    
}

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
    valor = valor.replace(/,/, ".")
    valor = parseFloat(valor)
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
                <th id="cabeca" class="headClick" onclick="sortNome(n,0)">Produto</th>
                <th id="cabeca" class="headClick" onclick="sortValor(v,0)">Valor</th>
                <th id="cabeca">Editar</th>
                <th id="cabeca">Apagar</th>
            </tr>
        </table>`;
    let tableB = document.getElementById("listaTable");
    for(let i=0;i<produtos.length;i++){
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
    }
  }



function exibirInfo(id){
    for(let i=0;i<produtos.length;i++){
        if (produtos[i].id===id){
            return document.getElementById("listaTable").innerHTML = `
            ID: ${produtos[i].id}<br>
            Nome: ${produtos[i].nome}<br>
            Descrição: ${produtos[i].descricao}<br>
            
            Valor: ${produtos[i].valor}<br>
            Data de cadastro: ${dataFormatada(produtos[i].incluidoEm)}
            `
        }
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
            document.getElementById("valor").value = produtos[i].valor.toString()
            document.getElementById("incluir").innerHTML = `<input type="button"  class="botaoSalvar" onclick="salvar(${i})" value="Salvar">`
            document.getElementById("cancelar").innerHTML = `<input type="button" class="botaoCancelar" onclick= "cancela()" value="Cancelar">`
        }
        i++;
    }
    
}

function salvar(id){
    produtos[id].nome = document.getElementById("nome").value
    produtos[id].descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value
    valor = valor.replace(/,/, ".")
    produtos[id].valor = parseFloat(valor)
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
    for(let i=0; i<produtos.length; i++){
        if(produtos[i].id===id){
            produtos.splice(produtos.indexOf(produtos[i]), 1)
        }
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

// variável n foi declarada lá no topo do código, é uma variável global, o mesmo vale para as outras variáveis usadas nas funções de ordenação.
// a variável n me diz se a tabela está ordenada de forma crescente ou decrescente.
function sortNome(n,auxOP){
    if(auxOP===0){
        if (n===1){
            ordenaName(produtos, auxOP)
        }else if(n===0){
            inverteNome(produtos, auxOP)
        }   
    }else if(auxOP===1){
        if (n===1){
            ordenaName(auxiliar, auxOP)
        }else if(n===0){
            inverteNome(auxiliar, auxOP)
        }
    }
}

function ordenaName(vetor, auxOP){
    const x = vetor.sort((a,b)=>{
        return a.nome.localeCompare(b.nome);
    })
    if(auxOP===0){
        listarProdutos()
    }else{
        listarSearch(vetor)
    }
    n=0;
}

function inverteNome(vetor, auxOP){
    const x = vetor.sort((a,b)=>{
        return b.nome.localeCompare(a.nome);
    })
    if(auxOP===0){
        listarProdutos()
    }else{
        listarSearch(vetor)
    }
 
    n=1;
}


function sortValor(v,auxOP){
    if (auxOP===0){    
        if (v===1){
            ordenaValor(produtos, auxOP)
        }else if(v==0){
            inverteValor(produtos, auxOP)
        }
    }else if(auxOP===1){
        if (v===1){
            ordenaValor(auxiliar, auxOP)
        }else if(v==0){
            inverteValor(auxiliar, auxOP)
        }
    }

}

function ordenaValor(vetor, auxOP){
    const x = vetor.sort((a,b)=>{
        return a.valor - b.valor;
    })
    if(auxOP===0){
        listarProdutos()
    }else{
        listarSearch(vetor)
    }
    v=0;
}

function inverteValor(vetor, auxOP){
    const x = vetor.sort((a,b)=>{
        return b.valor - a.valor;
    })
    if(auxOP===0){
        listarProdutos()
    }else{
        listarSearch(vetor)
    }
    
    v=1;
}


function searchProduto(){
    let valor=document.getElementById("buscar").value
    if(valor.length<1){
        return listarProdutos();
    }
    valor=valor.toLowerCase();
    auxiliar=produtos.filter((b)=>b.nome.toLowerCase().includes(valor));
    auxiliar=auxiliar.concat(produtos.filter((b)=>b.descricao.toLowerCase().includes(valor)));
    
    if(auxiliar.length<1){
        document.getElementById("saida").innerHTML = `Não foram encontrados produtos conforme chave de pesquisa!`
        
    }else{
        document.getElementById("saida").innerHTML = `Foram encontrado(s) ${auxiliar.length}`
        listarSearch(auxiliar)
    }
}


function listarSearch(vetor){
    if (vetor.length<1){
        document.getElementById("listaTable").innerHTML = ``
        return  listarProdutos();
    }
    document.getElementById("saida").innerHTML = ``
    document.getElementById("listaTable").innerHTML = ``
    document.getElementById("listaTable").innerHTML = `           
        <table id="listaTable">
            <tr>
                <th id="cabeca">Id</th>
                <th id="cabeca" class="headClick" onclick="sortNome(n,1)">Produto</th>
                <th id="cabeca" class="headClick" onclick="sortValor(v,1)">Valor</th>
                <th id="cabeca">Editar</th>
                <th id="cabeca">Apagar</th>
            </tr>
        </table>`;
    let tableB = document.getElementById("listaTable");
    for(let i=0; i<vetor.length; i++){
        let row = tableB.insertRow()
        let idCel = row.insertCell()
        let nomeCel = row.insertCell()
        let valorCel = row.insertCell()
        let editCel = row.insertCell()
        let deleteCel = row.insertCell()

        idCel.innerHTML  = vetor[i].id
        nomeCel.innerHTML  = `<a onclick="exibirInfo(${vetor[i].id})" class="nomeClick" >${vetor[i].nome}</a>`
        valorCel.innerHTML  = vetor[i].valor
        editCel.innerHTML  = `${exibeEditar(vetor[i].id)}`
        deleteCel.innerHTML  = `${exibeDeletar(vetor[i].id)}`
    }
  }