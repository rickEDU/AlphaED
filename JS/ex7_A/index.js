// A data não pode ser superior a data atual ou inexxistente
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
    nome.value = nome.value.replace(/[\041-\100]/g, "")
    nome.value = nome.value.replace(/[\133-\140]/g, "")
    nome.value = nome.value.replace(/[\173-\277]/g, "")
    

    obj.name = nome.value
    console.log(obj.name)
})




dataNascimento.addEventListener('input', function(){
    console.log(dataNascimento.value)
    let dataObj = new Date(dataNascimento.value)

    dataObj.setHours(dataObj.getHours()+3)
    dataHj = new Date()
    if (dataObj>dataHj){
        console.log("data inválida")
        // colocar saida para o usuário
    }else if (!validaData(dataObj)){
        console.log("data Inexistente")
        // colocar saida para o usuário
    }else{
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
        // O record mundial de peso que uma pessoa alcançou foi 595 Kgs, dei 105 Kg a mais nesse teste, segue o link: https://www.bbc.com/portuguese/geral-42078067#:~:text=O%20mexicano%20Juan%20Pedro%20Franco,de%20p%C3%A9%20e%20andar%20sozinho.
        console.log("peso inválido!")
    }else{
        obj.weight = aux
    }

})

altura.addEventListener('input', function(){
    altura.value = altura.value.replace(/[^0-9]/, "")
    let aux = parseInt(altura.value)

    if(aux>300 || aux<=0){
        console.log("altura inválida")
    }else{
        obj.height = aux
        console.log(obj.height)
    }
})


gender.addEventListener('change', function(){
    switch(gender.value){
        case "0":
            //apaga tudo
            console.log("Apagar")
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
    console.log("nome: ",obj.name)
    console.log("data: ",obj.birthDate)
    console.log("Peso: ",obj.weight)
    console.log("Altura: ",obj.height)
    console.log("Genero: ",obj.gender)
})