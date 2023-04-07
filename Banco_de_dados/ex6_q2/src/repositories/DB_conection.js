const executar = require('./conection.js')
const { insert, verify } = require('./query/query.js');

const TAG = '/REPOSITORIES '

exports.DB_insertProduct = async (id, product) =>{
    try{
        let verifyVetor = []
        for(let i = 0; i< product.length; i++){
            const queryVerify = {
                text: verify,
                values: [product[i]]
            }
            verifyVetor.push(queryVerify)
        }

        const reponseVerify =  await executar.executarQuerys(verifyVetor)
        for(let veri of reponseVerify){
            if(veri == undefined){
                throw 'Error: id de produto não encontrado no Database.'
            }
        }

        const query = [{
            text: insert,
            values: [id,product]
        }]

        const response  = await executar.executarQuerys(query)
        return response[0].adicionar_lista_pedidos
    }catch(e){
        console.log(TAG, e)
        throw e
    }
}