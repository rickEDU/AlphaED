const dbPlanet = require("../repositories/DB_conection.js");

const TAG = '/SERVICE '
exports.SV_insertProduct = async (id, product) =>{
    try{
      const response = await dbPlanet.DB_insertProduct(id, product)
      return response;
    }catch(e){
      console.log(TAG,e)
      throw e
    }

}