let person = {
    "birthDate": "",
    "gender": "",
    "daysToDeath": function(){
        if(person.gender==="masculino"){
            // caso seja Masculino o valor do campo gender
            let anoAux = person.birthDate.getFullYear()
            let anoAtual = new Date()

            let anoDeath= (anoAux+73)-(anoAtual.getFullYear())
            let restoDoAno = restoDoY(anoAtual)
            let diferenca = restoDoY(person.birthDate)
            anoDeath = (((anoDeath*365)+(Math.floor(anoDeath/4)))+36)+restoDoAno-diferenca
            return anoDeath;
        }else{
            //caso seja Feminino o valor do campo gender.
            let anoAux = person.birthDate.getFullYear()
            let anoAtual = new Date()
            
            let anoDeath= (anoAux+80)-(anoAtual.getFullYear())
            let restoDoAno = restoDoY(anoAtual)
            let diferenca = restoDoY(person.birthDate)
            anoDeath = (((anoDeath*365)+(Math.floor(anoDeath/4)))+36)+restoDoAno-diferenca
            return anoDeath;
        }
    }     
}
// calcula os dias que faltam para completar o ano Obs: recebe um objeto do tipo Date.
function restoDoY(data){
    let ano = data.getFullYear()
    ano = ano%4
    let mesesRestantes = 12-data.getMonth()
    let diasRestantes = (mesesRestantes*30)-data.getDate()
    if (ano===0 && (data.getMonth())<2){
        diasRestantes += 1;
    }
    if (mesesRestantes===12){
        return diasRestantes = diasRestantes-2+7
    }else if(mesesRestantes===11){
        return diasRestantes = diasRestantes-2+6
    }else if(diasRestantes===10){
        return diasRestantes = diasRestantes+6
    }else if(mesesRestantes===9 || mesesRestantes===8){
        return diasRestantes = diasRestantes+5
    }else if(mesesRestantes===7 || mesesRestantes===6){
        return diasRestantes = diasRestantes+4
    }else if(mesesRestantes===5){
        return diasRestantes = diasRestantes+3
    }else if(mesesRestantes===4 || mesesRestantes===3){
        return diasRestantes = diasRestantes+2
    }else{
        return diasRestantes = diasRestantes+1
    }
}

dia.addEventListener('input', function(){
    dia.value = dia.value.replace(/[^0-9]/, "")
})
mes.addEventListener('input', function(){
    mes.value = mes.value.replace(/[^0-9]/, "")
})
ano.addEventListener('input', function(){
    ano.value = ano.value.replace(/[^0-9]/, "")
})


verificar.addEventListener('click', function(){
    let dia = document.getElementById("dia").value
    let mes = document.getElementById("mes").value
    let ano = document.getElementById("ano").value
    let gender = document.getElementById("genero").value
    
    
    document.getElementById("saida").innerHTML = ``
    try{
        verifica_D_M_Y(dia, mes, ano)

        validaGender(gender)

        let fullDate= ano+"-"+mes+"-"+dia
        fullDate = new Date(fullDate)
        if (ano<2019){
            // acrescenta 3 horas, pois até o ano 2019 existia o horário de verão, o que subtrai 3 horas da data em alguns meses dos anos anteriores.
            fullDate.setHours(fullDate.getHours()+3)
        }

        valida_BirthDate(fullDate)

    } catch(e){
        console.log(e)
        return document.getElementById("saida").innerHTML = `<p>${e}</p>`
    }
    
    dia = parseInt(dia)
    mes = parseInt(mes)
    ano = parseInt(ano)

    // concatena o valor das entradas para compor a data.
    let fullDate= ano+"-"+mes+"-"+dia

    // converte a data em um objeto Date.
    fullDate = new Date(fullDate)

    person.gender = gender.toLowerCase()

    // salva o valor da data inserida no objeto.
    person.birthDate = fullDate

    // guarda a quantidade de dias restantes.
    let diaRestante = person.daysToDeath()
    let dataAtual = new Date()
    //caso o cidadão tenha nascido a mais de 73 ou 80 anos atrás.
    if (person.gender==="masculino" && ano<=dataAtual.getFullYear()-73){
        return document.getElementById("saida").innerHTML = `<p>Segundo o IBGE você já deveria estar morto.</p>`
    }
    if (person.gender==="feminino" && ano<=dataAtual.getFullYear()-80){
        return document.getElementById("saida").innerHTML = `<p>Segundo o IBGE você já deveria estar morto.</p>`
    }

    // retorna a quantidade de dias restantes na tela.
    return document.getElementById("saida").innerHTML = `<p>Faltam ${diaRestante} para você morrer.</p>`
})


// verifica se a data é uma data válida.
function verifica_D_M_Y(dia,mes,ano){
    if(dia==="" || mes==="" || ano===""){
        throw 'ERRO!! Insira uma Data completa.'
    }
    dia = parseInt(dia)
    mes = parseInt(mes)
    ano = parseInt(ano)
    if (dia>31 || dia<1){
        throw 'ERRO! Dia inválido'
    }
    if (mes>12 || mes<1){
        throw 'ERRO! Mês inválido'
    }
    if (ano>9999 || ano<0){
        throw 'ERRO! Ano inválido'
    }
    if(!validData(dia, mes, ano)){
        throw 'ERRO! Data inválida'
    }
}

function validData(dia, mes, ano){
    if (ano%4===0 && mes===2){
        if (dia<1 || dia>29){
            return false;
        }else{
            return true;
        }
    }else if(mes===1 || mes===3 || mes===5 || mes===7 || mes===8 || mes===10 || mes===12){
        if (dia<1 || dia>31){
            return false;
        }else{
            return true;
        }
    }else if (mes===2){
        if (dia<1 || dia>28){
            return false;
        }else{
            return true;
        }
    }else{   
        if(dia<1 || dia>30){
            return false;
        }else{
            return true;
        }
    }
}

// verifica se a data inserida é maior que a data atual.
function valida_BirthDate(data){
    let dataHJ= new Date()
    if (data>dataHJ){
        throw `ERRO! data Inválida`
    }
}

// verifica se o genero inserido é um dos gêneros esperados
function validaGender(gender){
    if (gender==="feminino" || gender==="masculino"){
        return ``;
    }else{
        throw `Erro! Gênero inválido.`;
    }
}