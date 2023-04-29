import { Request, Response } from "express"
import { APIResponse, IData, IDataAPI, IDataLogin, IResponseLogin} from "../interfaces/interfaces"
import { NameValidator, EmailValidator, PasswordValidator } from "../helpers/validators"
import serviceAccount from "../service/accounts"
import jwt from 'jsonwebtoken'

const TAG:string = '/CONTROLLER '

export default class account{

    public async create(req:Request, res: Response){
        const API_response: APIResponse<IDataAPI> = {
            message: 'Sucess',
            code: 201,
            data:{
                id: 0,
                email: '',
                name: ''
            },
            error:[null]
        }
        const API_error: APIResponse<IDataAPI> = {
            message: 'Error',
            code: 400,
            data:null,
            error:[null]
        }
        try{
            const {name, email, password} = req.body
            new NameValidator(name)
            new EmailValidator(email)
            new PasswordValidator(password)

            const service = new serviceAccount
            const response:IDataAPI = await service.SvCreate({name, email, password})
            API_response.data = response
            res.status(API_response.code).json(API_response)
        }catch(e:any){
            console.log(TAG,e)
            API_error.error = [e]
            res.status(API_error.code).json(API_error)
        }
    }

    public async update(req:Request, res: Response){
        const API_response: APIResponse<IDataAPI> = {
            message: 'Sucess',
            code: 200,
            data:{
                id: 0,
                email: '',
                name: ''
            },
            error:[null]
        }
        const API_error: APIResponse<IDataAPI> = {
            message: 'Error',
            code: 400,
            data:null,
            error:[null]
        }
        try{
            const {name, email, decoded} = req.body

            new NameValidator(name)
            new EmailValidator(email)
            
            let body:IData = {name:name, email: email} 
            if(req.body.password!=undefined){
                body.password = req.body.password
                new PasswordValidator(body.password)
            }
            const service = new serviceAccount
            const search:IData|undefined = await service.SvSearch(decoded.id)
            if(!search){
                API_error.code = 404;
                API_error.error = ['Error: Account Not Found.']
                return res.status(API_error.code).json(API_error)
            }

            const response = await service.SvUpdate(search,body, decoded.id);
            API_response.data = response
            res.status(API_response.code).json(API_response)
        }catch(e:any){
            console.log(TAG,e)
            API_error.error = [e]
            return res.status(API_error.code).json(API_error)
        }
    }
    public async login(req:Request, res: Response){
        const API_response: APIResponse<IResponseLogin> = {
            message: 'Sucess',
            code: 200,
            data:{
                id: 0,
                email: ''
            },
            error:[null]
        }
        const API_error: APIResponse<IResponseLogin> = {
            message: 'Error',
            code: 400,
            data:null,
            error:[null]
        }
        try{
            const {email, password} = req.body
            new EmailValidator(email)
            new PasswordValidator(password)

            const service = new serviceAccount
            const response:IDataLogin|undefined = await service.SvLogin(email);
            if(!response){
                API_error.code = 404;
                API_error.error = ['Error: Account Not Found']
                return res.status(API_error.code).json(API_error)
            }
            if(response.password!=password){
                API_error.code = 403;
                API_error.error = ['Error: Forbiden']
                return res.status(API_error.code).json(API_error)
            }
            const secretKey:string | undefined = process.env.JWTSECRET 

            const jwt_cookie = jwt.sign( {id: response.id}, secretKey!)
            res.cookie("session", jwt_cookie, {maxAge: 300000})
            if(!API_response.data){
                throw 'Error: Response error.'
            }
            API_response.data.id = response.id
            API_response.data.email = response.email
            return res.status(API_response.code).json(API_response)
        }catch(e:any){
            console.log(TAG,e)
            API_error.error = [e]
            return res.status(API_error.code).json(API_error)
        }
    }
}