const session_repository = require('../repository/session')

const TAG = '/SERVICE:'

exports.service_post_session = async (email)=>{
    try{
        const result = await session_repository.repository_post_session(email)
        if(result.length == 0){
            throw 'Usuário não encontrado'
        }
        return result[0]
    }catch(error){
        console.log(TAG, 'service post : ', error)
        throw error
    }
}   