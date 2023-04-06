let service = require('../service/operators.js')

// const user ={
//     user: id,
//     produtos: [1,2,3...],
// }   

const TAG = '/CONTROLLER '

exports.insertProduct = async (req, res)=>{
    try{
        const {id, product} = req.body;
        if(!id){
            throw 'faltando id'
        }
        if(!product || product.length==0){
            throw 'faltando produto'
        }
    
        const response = await service.SV_insertProduct(id, product)
        res.status(200).json({sucess: response})
    }catch(e){
        console.log(TAG,e)
        res.status(400).json({error: e})
    }
}