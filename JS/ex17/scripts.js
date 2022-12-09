let objeto = {};
cep.addEventListener('input', mascara);
botao.addEventListener('click', search);
document.getElementById('botao').style.cursor = "pointer";


function mascara (){
    let cep = document.getElementById("cep")
    cep.value=cep.value.replace(/[^0-9-]/g, "")

    if (cep.value.length===5){
        cep.value += "-"
    }else if(cep.value.length===6){
        cep.value = cep.value.replace("-", "")
    }else if(cep.value[5]!="-" && cep.value[5]!=undefined){
        cep.value = cep.value.replace(/-/g, "")
        cep.value = cep.value.slice(0,5)+"-"+cep.value.slice(5,8)
    }
}

async function search(){
    cursorWait()

    let cep = document.getElementById("cep")
    let cepV = cep.value
    cepV = cepV.replace(/-/g, "")
    let url = `https://cep.awesomeapi.com.br/json/${cepV}`
    let resposta = await fetch(url)
    let objs = await resposta.json()
    objeto = objs
    
    if(objs.status===400 || objs.status===404){
        cursorDefault()
        document.getElementById("saidaIframe").innerHTML = ``
        return document.getElementById("saida").innerHTML = `<h1> ERRO, Cep inválido</h1>`
    }
    exibeResultado()
}

function exibeResultado(){
    resultado = `
    <p>
    Endereço: ${objeto.address}<br>
    Bairro: ${objeto.district}<br>
    Cidade: ${objeto.city}<br>
    Estado: ${objeto.state}<br>
    Latitude: ${objeto.lat}<br>
    Longitude: ${objeto.lng}<br>
    </p>
    <button onclick="iframe()" class="botao">Mostrar no mapa</button>
    `
    cursorDefault()
    return document.getElementById("saida").innerHTML = `${resultado}`
}

function iframe(){

    retorno = `<iframe
    width:"750";
    height:"450";
    border:0;
    class="frame"
    frameborder:"0";
    referrerpolicy="no-referrer-when-downgrade"
    src="https://maps.google.com/maps?q=${objeto.lat},${objeto.lng}&hl=pt&z=14&output=embed"
    allowfullscreen>
    </iframe>`

    return document.getElementById("saidaIframe").innerHTML = `${retorno}`
}


function cursorWait(){
    document.body.style.cursor = "wait"
    document.getElementById("botao").style.cursor = "wait"
}

function cursorDefault(){
    document.body.style.cursor = "default"
    document.getElementById("botao").style.cursor = "pointer"
}

