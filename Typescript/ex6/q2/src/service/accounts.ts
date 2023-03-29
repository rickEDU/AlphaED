import { IData,IConection } from "../interfaces/interfaces";
import { conection } from "../repository/conection";

export default class serviceAccount{
    public async SvCreate(data: IData){
        try{
            const conected = new conection()
            const query: IConection = {
                text: 'insert into accounts(name, email, password) values ($1, $2, $3) returning id,name,email',
                values: [data.name, data.email, data.password]}
            const response = await conected.execulteQuery(query)
            return response;
        }catch(e){
            console.log(e)
        }    
    }

    public async SvUpdate(data: IData, id:string){
        try{
            const conected = new conection()
            const query: IConection = {
                text: 'update accounts set name=$1, email=$2, password=$3 where id=$4 returning id,name,email',
                values: [data.name, data.email, data.password, id]}
            const response = await conected.execulteQuery(query)
            return response;
        }catch(e){
            console.log(e)
        }    
    }
}