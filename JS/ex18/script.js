let estadoSelect = document.getElementById("estado")
let cidadeSelect = document.getElementById("cidade")
let imagem = document.getElementById("imagem")
//objeto = {}
//chaves = []

// estados
const estados = ()=>{
    return new Promise((resolve, reject)=>{
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then((resposta)=>{
            if(resposta.status!=200){
                return reject("ERRO! Houve algum erro na requisição.")
            }else{
                return resposta.json()
            }})
            .then((resposta)=>{
                resposta.sort((a,b)=>{
                    return a.nome.localeCompare(b.nome);
                })
                return resolve(resposta)
            })
            .catch((e)=>{
                return reject(e);
            })
    })
}

estados()
    .then((data) =>{add_SelectEstados(data)})
    .catch((erro)=>{exibeErro(erro)})


const add_SelectEstados = (resposta)=>{
    // ADD opções
    let op = document.createElement('option')
    op.value = "N/A"
    op.textContent = "-Opções-"
    estadoSelect.appendChild(op)
    // ADD estados
    for(x of resposta){
        let op = document.createElement('option')
        op.value = x.sigla
        op.textContent = x.nome
    
        estadoSelect.appendChild(op)
    }
}

// Evento de change no select dos estados.
estadoSelect.addEventListener('change', ()=>{
    document.getElementById("cidade").innerHTML = ``
    document.getElementById("saida").innerHTML = ``
    cidades()
        .then((data)=>{add_SelectCidades(data)})
        .catch((erro)=>{exibeErro(erro)})

})

const cidades = () =>{
    return new Promise((resolve, reject) => {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelect.value}/distritos`)
            .then((resposta)=>{
            if(resposta.status!=200){
                return reject("Erro! Selecione um ESTADO")
            }else{
                return resposta.json()
            }    
            })
            .then((resposta)=>{
                resposta.sort((a,b)=>{
                    return a.nome.localeCompare(b.nome);
                })
                return resolve(resposta)
            })
            .catch(e=>{
                return reject(e)
            })
        })
}


const add_SelectCidades = (resposta)=>{
    // apaga o select em caso de troca de estado

    // Criação do select das cidades
    let label = document.createElement('label')
    label.textContent = "Cidades: "
    let select = document.createElement('select')
    select.id = 'cidade'
    select.classList.add('select')

    // Evento de change no select das cidades
    select.addEventListener('change', ()=>{
        cursorWait()
        previsao(select.value)
            .then((data) =>{exibePrev(data)})
            .catch((erro)=>{exibeErro(erro)})
    })
    
    cidadeSelect.appendChild(label)
    cidadeSelect.appendChild(select)

    // ADD opções
    let op = document.createElement('option')
    op.value = "N/A"
    op.textContent = "-Opções-"
    select.appendChild(op)

    // ADD as cidades
    for(x of resposta){
        let op = document.createElement('option')
        op.value = x.municipio.id
        op.textContent = x.nome
    
        select.appendChild(op)
    }
}

const previsao = (valor) =>{
    return new Promise((resolve, reject)=>{
        fetch(`https://apiprevmet3.inmet.gov.br/previsao/${valor}`)
            .then((resposta)=>{
            cursorWait()
            if(resposta.status!=200){
                return reject("Erro! Previsão.")
            }else{
                return resposta.json()
            }    
            })
            .then((resposta)=>{
                let chaves = Object.keys(resposta[Object.keys(resposta)])
                let objeto = resposta[Object.keys(resposta)]
                let retorno = [chaves, objeto]
                return resolve(retorno)
            })
            .catch((e)=>{
                return reject(e)
            })
    })
}


const exibePrev = (data)=>{
    chaves = data[0]
    objeto = data[1]
    cursorDefault()
    let retorno = ``
    for(let i=0;i<2;i++){
        retorno  = retorno+`<p> Dia ${chaves[i]} :<br>
            Manhã: <img src="${objeto[chaves[i]].manha.icone}" width="25px"/><br>
            Resumo: ${objeto[chaves[i]].manha.resumo}<br>
            Temperatura máxima: ${objeto[chaves[i]].manha.temp_max}<br>
            Temperatura mínima: ${objeto[chaves[i]].manha.temp_min}<br>

            Tarde: <img src="${objeto[chaves[i]].tarde.icone}" width="25px"/><br>
            Resumo: ${objeto[chaves[i]].tarde.resumo}<br>
            Temperatura máxima: ${objeto[chaves[i]].tarde.temp_max}<br>
            Temperatura mínima: ${objeto[chaves[i]].tarde.temp_min}<br>

            Noite: <img src="${objeto[chaves[i]].noite.icone}" width="25px"/><br>
            Resumo: ${objeto[chaves[i]].noite.resumo}<br>
            Temperatura máxima: ${objeto[chaves[i]].noite.temp_max}<br>
            Temperatura mínima: ${objeto[chaves[i]].noite.temp_min}<br>
            </p>`
    }
    for(let i=2;i<=4;i++){
        retorno = retorno+`<p>Dia ${chaves[i]} :<br><img src="${objeto[chaves[i]].icone}" width="25px"/><br>
        Resumo: ${objeto[chaves[i]].resumo}<br>
        Temperatura máxima: ${objeto[chaves[i]].temp_max}<br>
        Temperatura mínima: ${objeto[chaves[i]].temp_min}<br></p>`
    }

    document.getElementById("saida").innerHTML = retorno
}

const exibeErro = (erro) =>{
    cursorDefault()
    document.getElementById("saida").innerHTML = erro
}

const cursorWait = ()=>{
    document.body.style.cursor = "wait"
    document.getElementById("estado").style.cursor = "wait"
    document.getElementById("row").style.cursor = "wait"
    document.getElementById("saida").style.cursor = "wait"
}

const cursorDefault = ()=>{
    document.body.style.cursor = "default"
    document.getElementById("estado").style.cursor = "default"
    document.getElementById("row").style.cursor = "default"
    document.getElementById("saida").style.cursor = "default"
}
    