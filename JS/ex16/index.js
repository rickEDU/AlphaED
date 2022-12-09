let moeda = document.getElementById("moeda1")
let data1 = document.getElementById("data1")
let data2 = document.getElementById("data2")

vetorMoedas =[
  {cod: "USD-BRL",nome:"Dólar Americano/Real Brasileiro"},
  {cod: "USD-BRLT",nome:"Dólar Americano/Real Brasileiro Turismo"},
  {cod: "CAD-BRL",nome:"Dólar Canadense/Real Brasileiro"},
  {cod: "EUR-BRL",nome:"Euro/Real Brasileiro"},
  {cod: "BTC-BRL",nome:"Bitcoin/Real Brasileiro"},
  {cod: "EUR-USD",nome:"Euro/Dólar Americano"},
  {cod: "GBP-USD",nome:"Libra Esterlina/Dólar Americano"},
  {cod: "ARS-USD",nome:"Peso Argentino/Dólar Americano"},
  {cod: "CNY-USD",nome:"Yuan Chinês/Dólar Americano"},
  {cod: "PYG-USD",nome:"Guarani Paraguaio/Dólar Americano"},
]
let objeto = {};

for(x of vetorMoedas){
  let op = document.createElement('option')
  op.value = x.cod
  op.textContent = x.nome

  moeda.appendChild(op)

}

async function requisicao(){
  document.body.style.cursor = "wait";
  document.getElementById("botao").style.cursor = "wait";

  dataStart = data1.value.replace(/-/g, "")
  dataEnd = data2.value.replace(/-/g, "")

  let url = `https://economia.awesomeapi.com.br/json/daily/${moeda.value}/?start_date=${dataStart}&end_date=${dataEnd}`
  let resposta = await fetch(url)
  let objs = await resposta.json()
  objeto = objs[0]
  console.log(objs)
  
  if(erro(objs)){
    return;
  }

  tabelaH()
}   

botao.addEventListener('click', requisicao)


function tabelaH(){
  document.body.style.cursor = "pointer";
  document.getElementById("botao").style.cursor = "pointer";
  
  document.getElementById("saida").innerHTML = `
    <table class="tabela">
      <tr>
        <th id="cabeca">data</th>
        <th id="cabeca">hora</th>
        <th id="cabeca">valor de compra</th>
        <th id="cabeca">valor de venda</th>
        <th id="cabeca">valor mínimo</th>
        <th id="cabeca">valor máximo</th>
      </tr>${tabelaB()}
    </table>`
}

function tabelaB(){
  return retorno = `
  <tr>
      <th>${formataData(objeto.create_date)}</th>
      <th>${formataHora(objeto.create_date)}</th>
      <th>${objeto.bid}</th>
      <th>${objeto.ask}</th>
      <th>${objeto.low}</th>
      <th>${objeto.high}</th>
  </tr>
  `
}

function erro(obj){
  if(obj.status===404 || obj.length===0){
    document.body.style.cursor = "pointer"
    document.getElementById("botao").style.cursor = "pointer";
    document.getElementById("saida").innerHTML = "<h1>ERRO, não encontrado</h1>"
    return true;
  }else{
    return false;
  }
}

function formataData(data){
  let dataF = data.slice(8,10) +"/"+ data.slice(5,7) +"/"+ data.slice(0,4);
  return dataF;
}
function formataHora(data){
  let dataF = data.slice(11)
  return dataF;
}