
const conection = require('./conection')

const TAG = '/REPOSITORY: '

exports.repository_post_session = async (email) =>{
    try{
        const query = [
            {text: "select * from users where email=$1",
            params: [email]}]
        const result  =  await conection.executarQuerys(query)
        return result[0].rows
    }catch(error){
        console.log(TAG, 'repository post : ', error)
        return error
    }
}