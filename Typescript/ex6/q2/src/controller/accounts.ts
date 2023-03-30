import { Request, Response } from "express"
import { IData, IDataAPI, IDataLogin} from "../interfaces/interfaces"
import { NameValidator, EmailValidator, PasswordValidator } from "../helpers/helper"
import serviceAccount from "../service/accounts"
import jwt from 'jsonwebtoken'

const TAG:string = '/CONTROLLER '

export default class account{

    public async create(req:Request, res: Response){
        try{

            const {name, email, password} = req.body
            const validatorName = new NameValidator(name)
            const validatorEmail = new EmailValidator(email)
            const validatorPassword = new PasswordValidator(password)
            if(validatorName.fail){
                throw validatorName.message
            }else if(validatorEmail.fail){
                throw validatorEmail.message
            }else if(validatorPassword.fail){
                throw validatorPassword.message
            }
            const service = new serviceAccount
            const response:IDataAPI|undefined = await service.SvCreate({name, email, password})
            if(!response){
                throw 'Error: Account creation error'
            }
            res.status(201).json({message:"Sucess", code: 201, data: response, error: null})
        }catch(e){
            console.log(TAG,e)
            res.status(400).json({message:"Error", code: 400, data: null, error: e})
        }
    }

    public async update(req:Request, res: Response){
        try{
            const {name, email, decoded} = req.body

            const validatorName = new NameValidator(name)
            const validatorEmail = new EmailValidator(email)
            
            if(validatorName.fail){
                throw validatorName.message
            }else if(validatorEmail.fail){
                throw validatorEmail.message
            }
            let body:IData = {name:name, email: email} 
            if(req.body.password!=undefined){
                body.password = req.body.password
                const validatorPassword = new PasswordValidator(body.password)
                if(validatorPassword.fail){
                    throw validatorPassword.message
                }
            }
            const service = new serviceAccount
            const search:IData|undefined = await service.SvSearch(decoded.id)
            if(!search){
                return res.status(404).json({message:"Error",code:404, data: null, error: 'Error: Account Not Found.'})
            }
            const response:IDataAPI|undefined = await service.SvUpdate(search,body, decoded.id);
            if(!response){
                return res.status(400).json({message:"Error",code:400, data: null, error: 'Error: Internal error.'})
            }
            res.status(200).json({message:"Sucess", code:200, data: response, error: null})
        }catch(e){
            console.log(TAG,e)
            res.status(400).json({message:"Error",code:400, data: null, error: e})
        }
    }
    public async login(req:Request, res: Response){
        try{

            const {email, password} = req.body
            const validatorEmail = new EmailValidator(email)
            const validatorPassword = new PasswordValidator(password)
            if(validatorEmail.fail){
                throw validatorEmail.message
            }else if(validatorPassword.fail){
                throw validatorPassword.message
            }
            const service = new serviceAccount
            const response:IDataLogin|undefined = await service.SvLogin(email);
            if(!response){
                return res.status(404).json({message:"Error",code:404, data: null, error: 'Account Not Found'})
            }
            if(response.password!=password){
                return res.status(403).json({message:"Error",code:403, data: null, error: 'Forbiden'})
            }
            const secretKey:string | undefined = process.env.JWTSECRET 
            if(!secretKey){
                throw 'Error: SecretKey is not a string.'
            }
            const jwt_cookie = jwt.sign( {id: response.id}, secretKey)
            res.cookie("session", jwt_cookie, {maxAge: 300000})
            res.status(200).json({message:"Sucess", code:200, data:{id:response.id} , error: null})
        }catch(e){
            console.log(TAG,e)
            res.status(400).json({message:"Error",code:400, data: null, error: e})
        }
    }
}