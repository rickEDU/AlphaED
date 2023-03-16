// A data não pode ser superior a data atual ou ser uma data inexxistente
// Peso deve ser salvo como float
// Altura deve ser salva como int
// Genero deve ser salvo como string

let obj = {
    "name": "",
    "birthDate": "",
    "weight": "",
    "height": "",
    "gender": ""
}

nome.addEventListener('input', function(){
    // usando a tabela de octal para excluir os caracteres especiais link: https://docs.generic-mapping-tools.org/6.2/_images/GMT_App_F_stand+_iso+.png
    nome.value = nome.value.replace(/[\031-\037]/g, "")
    nome.value = nome.value.replace(/[\041-\057]/g, "")
    nome.value = nome.value.replace(/[\072-\100]/g, "")
    nome.value = nome.value.replace(/[\133-\140]/g, "")
    nome.value = nome.value.replace(/[\173-\277]/g, "")
    

    obj.name = nome.value
    console.log(obj.name)
})




dataNascimento.addEventListener('input', function(){
    let dataObj = new Date(dataNascimento.value)

    dataObj.setHours(dataObj.getHours()+3)
    let dataHj = new Date()

    if (dataObj>dataHj){
        document.getElementById("dataSaida").innerHTML = `Data inválida! A não ser que você seja um viajante do futuro.`
        console.log("data inválida")
        
    }else if (!validaData(dataObj)){
        document.getElementById("dataSaida").innerHTML = `Data inválida! Insira uma data válida.`
        console.log("data Inexistente")
        
    }else{

        document.getElementById("dataSaida").innerHTML = `<p></p>`
        // Só salva no objeto se a Data for válida
        obj.birthDate = dataObj
    }
})

function validaData(data){
    return data instanceof Date && !isNaN(data);
}

peso.addEventListener('input', function(){
    peso.value = peso.value.replace(/[^0-9,.]/g, "")
    let aux=peso.value.replace(/,/g, ".")
    aux = parseFloat(aux)

    if (aux>700 || aux<=0){
        document.getElementById("pesoSaida").innerHTML = `Peso inválido! Insira o seu peso verdadeiro.`
        // O record mundial de peso que uma pessoa alcançou foi 595 Kgs, dei 105 Kg a mais nesse teste, segue o link: https://www.bbc.com/portuguese/geral-42078067#:~:text=O%20mexicano%20Juan%20Pedro%20Franco,de%20p%C3%A9%20e%20andar%20sozinho.
        console.log("peso inválido!")
    }else{
        document.getElementById("pesoSaida").innerHTML = `<p></p>`

        obj.weight = aux
    }

})

altura.addEventListener('input', function(){
    altura.value = altura.value.replace(/[^0-9]/, "")
    let aux = parseInt(altura.value)

    if(aux>400 || aux<=20){
        // O recordista mundial em altura tinha 2 metros e 45 cm, ou 245 cm. Acho muito difícil nascer um humano com mais de 4 metros.
        // A menor criança do mundo nasceu com 24 cm. Por isso escolhi por tamanho máx de 4 metros e mínimo de 20 cm.
        document.getElementById("alturaSaida").innerHTML = `Altura inválida! Insira sua altura verdadeira em cm`
        console.log("altura inválida")
    }else{
        document.getElementById("alturaSaida").innerHTML = `<p></p>`
        obj.height = aux
        console.log(obj.height)
    }
})


gender.addEventListener('change', function(){
    switch(gender.value){
        case "0":
            //apaga o conteúdo da chave
            obj.gender = ""
            break;
        case "1":
            obj.gender = "Masculino"
            break;
        case "2": 
            obj.gender = "Feminino"
            break;
        case "3":
            obj.gender = "Outro"
            break;
    }
})


exibir.addEventListener('click', function(){
    document.getElementById("saida").innerHTML = `
        <p>Nome: ${obj.name}</p>
        <p>Data de Nascimento: ${obj.birthDate}</p>
        <p>Peso: ${obj.weight}</p>
        <p>Altura: ${obj.height}</p>
        <p>Gênero: ${obj.gender}</p>
    `
    console.log(obj)
    console.log("nome: ",obj.name)
    console.log("data: ",obj.birthDate)
    console.log("Peso: ",obj.weight)
    console.log("Altura: ",obj.height)
    console.log("Genero: ",obj.gender)
})