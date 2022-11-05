let obj = {
    "name": "",
    "birthDate": "",
    "weight": "",
    "height": "",
    "gender": ""
}


// Nome
function nomeValid(){
    // usando a tabela de octal para excluir os caracteres especiais link: https://docs.generic-mapping-tools.org/6.2/_images/GMT_App_F_stand+_iso+.png
    nome.value = nome.value.replace(/[\031-\037]/g, "")
    nome.value = nome.value.replace(/[\041-\100]/g, "")
    nome.value = nome.value.replace(/[\133-\140]/g, "")
    nome.value = nome.value.replace(/[\173-\277]/g, "")

    if (nome.value.length<5){
        throw `Field "name" is invalid!`;
    }else{
        obj.name = nome.value
    }
}

// Data
function dataValid(){
    let dataObj = new Date(dataNascimento.value)

    dataObj.setHours(dataObj.getHours()+3)
    let dataHj = new Date()

    if (dataObj>dataHj){
        throw `Field “birthDate” is invalid!`;
    }else if (!validaData(dataObj)){
        throw `Field “birthDate” is invalid!`;
    }else{
        // Só salva no objeto se a Data for válida
        obj.birthDate = dataObj
    }
}

//verifica se a data é válida
function validaData(data){
    return data instanceof Date && !isNaN(data);
}

function formataData(data){
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    return `${data.getDate()} de ${meses[data.getMonth()]} do ano ${data.getFullYear()}`;
}

// Peso
function pesoValid(){
    //troca a vírgula por um ponto(.).
    // variavel auxíliar
    let aux=peso.value.replace(/,/g, ".")
    aux = parseFloat(aux)
    // variável auxíliar 2
    let aux2 = peso.value
    // apagando o ponto e a vírgula, pois só quero saber se tem letras no meio dos números com o isAllNumber().
    aux2 = peso.value.replace(/[\054-\056]/g, "")
    console.log(aux2)
    // verifica se a entrada é um do tipo number ou se tem letras no meio do número.
    if (isNaN(aux) || !isAllNumber(aux2)){
        throw "Field “weight” is invalid!";
    }else if (aux>700 || aux<=0){
        throw "Field “weight” is invalid!";
    }else{
        obj.weight = aux
    }

}

// Altura
function alturaValid(){
    altura.value = altura.value.replace(/,/g, ".")
    aux = parseInt(altura.value)
    // verifica se o valor de entrada é um valor inteiro, e se são todos números.
    if(isNaN(aux) || !isInt(aux) || !isAllNumber(altura.value)){
        throw `Field “height” is invalid!`;
    }else{
        obj.height = aux
    }
}

// essa função percorre toda a string para verificar se todos os elementos são números
// se todos forem números vai retornar verdadeiro, se não, falso.
function isAllNumber(x){
    for (let i=0; i<x.length;i++){
        if(isNaN(x[i])){
            return false;
        }
    }
    return true;
}

// verifica se é um número inteiro
function isInt(x){
    if(x%1===0){
        return true;
    }else{
        return false;
    }
}

//Gênero
function genderValid(){
    switch(gender.value){
        case "0":
            //apaga o conteúdo da chave
            obj.gender = ""
            throw `Escolha uma opção`;
        case "1":
            obj.gender = "Masculino"
            break;
        case "2": 
            obj.gender = "Feminino"
            break;
        case "3":
            obj.gender = "Outro"
            break;
        default:
            //se colocar a opção inválida ou qualquer outra, vai cair aqui e por padrão um erro é lançado.
            throw `Field “gender” is invalid!`;
    }
}




// Botão para exibir tudo
exibir.addEventListener('click', function(){
    // a variável "erro" vai me mostrar se houve algum erro durante a execução do código.
    let erro = false;
    //Erro no campo nome
    document.getElementById("saidaNome").innerHTML = ``
    try{
        nomeValid()
    }catch(e){
        erro=true;
        document.getElementById("saidaNome").innerHTML = `<p>${e}</p>`
        console.log(e)
    }

    //Erro no compo data
    document.getElementById("saidaData").innerHTML = ``
    try{
        dataValid()
    }catch(e){
        erro=true;
        document.getElementById("saidaData").innerHTML = `<p>${e}</p>`
        console.log(e)
    }

    //Erro no compo Peso
    document.getElementById("saidaPeso").innerHTML = ``
    try{
        pesoValid()
    }catch(e){
        erro=true
        document.getElementById("saidaPeso").innerHTML = `<p>${e}</p>`
        console.log(e)
    }

    //Erro no campo da Altura
    document.getElementById("saidaAltura").innerHTML = ``
    try{
        alturaValid()
    }catch(e){
        erro=true;
        document.getElementById("saidaAltura").innerHTML = `<p>${e}</p>`
        console.log(e)
    }
    
    //Erro no campo de Gênero
    document.getElementById("saidaGender").innerHTML = ``
    try{
        genderValid()
    }catch(e){
        erro=true;
        document.getElementById("saidaGender").innerHTML = `<p>${e}</p>`
        console.log(e)
    }
    // se houver algum erro ele não exibe os valores
    if (erro===true){
        // não exibe nada, e apaga se estiver exibindo.
        document.getElementById("saida").innerHTML = ``

    }else{
        // exibe o objeto.
        document.getElementById("saida").innerHTML = `
        <lable>Nome: ${obj.name}</lable><br>
        <lable>Data de Nascimento: ${formataData(obj.birthDate)}</lable><br>
        <lable>Peso: ${obj.weight}</lable><br>
        <lable>Altura: ${obj.height}</lable><br>
        <lable>Gênero: ${obj.gender}</lable><br><br>
        <lable> Objeto em JSON: ${JSON.stringify(obj)}<lable>
        `
        console.log("objeto com os valores:", obj)
    }

})
