import { Request, Response } from "express"
import { APIResponse, IConection, IUserData} from "../interfaces/interfaces"
import { NameValidator, EmailValidator, PasswordValidator } from "../helpers/helper"
import serviceAccount from "../service/accounts"

export default class account{

    public teste(req: Request, res: Response){
        return res.status(200).json({data:'certo'})
    }


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
            const response:object = await service.SvCreate({name, email, password})
            res.status(201).json({data: response, error: null})
        }catch(e){
            res.status(400).json({data:"error", error: e})
        }
    }
    public async update(req:Request, res: Response){
        try{
            const {name, email, password, id} = req.body
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
            const response:object = await service.SvUpdate({name, email, password}, id)
            res.status(200).json({data: response, error: null})
        }catch(e){
            res.status(400).json({data:"error", error: e})
        }
    }
}