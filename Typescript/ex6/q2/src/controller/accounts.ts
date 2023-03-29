import { Request, Response } from "express"
import { NameValidator, EmailValidator, PasswordValidator } from "../helpers/helper"

export default class account{

    public teste(req: Request, res: Response){
        return res.status(200).json({data:'certo'})
    }


    public create(req:Request, res: Response){
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
            res.status(200).json({data: req.body, error: null})
        }catch(e){
            res.status(400).json({data:"error", error: e})
        }
    }
}