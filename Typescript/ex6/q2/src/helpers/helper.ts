abstract class RegexValidator{
    public message: string;
    public fail: boolean = false;
    protected data_regex : RegExp = new RegExp('');

    constructor(data:any, data_regex: RegExp, type:string){
        this.data_regex = data_regex;
        if(!this.regex.test(data)){
            this.message = `Error: ${type}`
            this.fail = true
        }else{
            this.message = 'Sucess'
        }
        
    }
    protected get regex(): RegExp {
        return this.data_regex;
    }
}

export class EmailValidator extends RegexValidator {
    constructor(data:any){
        const data_regex: RegExp = new RegExp(/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim);
        super(data, data_regex, 'Email inválido');
        
    }
}
export class PasswordValidator extends RegexValidator {
    constructor(data:any){
        const data_regex: RegExp = new RegExp(/^\w{1,}$/gim);
        super(data, data_regex, 'Senha inválida');
    }
}
export class NameValidator extends RegexValidator {
    constructor(data:any){
        const data_regex: RegExp = new RegExp(/^[a-z ]{1,}$/gim);
        super(data, data_regex, 'Nome inválido');
    }
}