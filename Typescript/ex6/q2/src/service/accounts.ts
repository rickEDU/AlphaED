import { IData,IConection, IDataAPI, IDataLogin } from "../interfaces/interfaces";
import { conection } from "../repository/conection";

const TAG:string = '/SERVICE'

export default class serviceAccount{
    public async SvCreate(data: IData){
        try{
            const conected = new conection()
            const query: IConection = {
                text: 'insert into accounts(name, email, password) values ($1, $2, $3) returning id,name,email',
                values: [data.name, data.email, data.password]}
            const response:IDataAPI|undefined = await conected.execulteQuery(query)
            return response;
        }catch(e){
            console.log(TAG,e)
        }    
    }

    public async SvUpdate(data: IData, id:string|number){
        try{
            const conected = new conection()
            const query: IConection = {
                text: 'update accounts set name=$1, email=$2, password=$3 where id=$4 returning id,name,email',
                values: [data.name, data.email, data.password, id]}
            const response:IDataAPI|undefined = await conected.execulteQuery(query)
            return response;
        }catch(e){
            console.log(TAG,e)
            throw e
        }    
    }
    public async SvLogin(email: string){
        try{
            const conected = new conection()
            const query: IConection = {
                text: 'select id, email, password from accounts where email=$1',
                values: [email]}
            const response:IDataLogin|undefined = await conected.execulteQuery(query)
            return response;
        }catch(e){
            console.log(TAG,e)
            throw e
        }    
    }
}