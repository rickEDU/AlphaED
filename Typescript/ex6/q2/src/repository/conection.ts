import { pool } from "./pool";
import { IConection } from "../interfaces/interfaces";


export class conection{
    public async execulteQuery(query:IConection){
        try{
            const response = await pool.query(query.text, query.values)
            return response.rows[0];
        }catch(e){
            console.log(e)
        }
    }
}