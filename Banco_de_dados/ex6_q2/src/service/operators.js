const dbPlanet = require("../repositories/DB_conection.js");

const TAG = '/SERVICE '
exports.SV_insertProduct = async (id, product) =>{
    try{
      const response = await dbPlanet.DB_insertProduct(id, product)
      const responseFormat = response.replace(/[()]/g, "")
      const vetorResponse = responseFormat.split(',')
      const data = {
        id_pedido: vetorResponse[0],
        id_usuario: vetorResponse[1],
        status:'Open',
        date:vetorResponse[3],
        valor_total: vetorResponse[4]
      }
      return data;
    }catch(e){
      console.log(TAG,e)
      throw e
    }

}