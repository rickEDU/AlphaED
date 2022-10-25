function imprimirDate(){
    let dia = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"]
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    let valor = document.querySelector("#entrada2").value
    let formatado = new Date(valor)
    formatado.setHours(formatado.getHours()+3)

    if (validaData(formatado)){
        document.getElementById("saida2").innerHTML = 
        `Dia: ${formatado.getDate()}<br>
        Mês: ${formatado.getMonth()+1}<br>
        Ano: ${formatado.getFullYear()}<br> 
        Dia da Semana: ${dia[formatado.getDay()]}<br>
        Mês por extenso: ${meses[formatado.getMonth()]}<br>
        valor da data em MS: ${Date.parse(formatado)}`
    }else{
        document.querySelector("#saida2").textContent = "ERRO!! Data inválida!!"
    }
}

function validaData(data){
    return data instanceof Date && !isNaN(data);
}


