
document.addEventListener('input', mascara);


function mascara (){
    let cep = document.getElementById("entrada")
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

