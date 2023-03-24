class Validator {
    data: number | string | boolean ;

    constructor(data: any ){
        this.data = data;
    }
}

class StringValidator extends Validator {
    constructor(data:string){
        if(typeof data !== "string"){
            throw new Error("O tipo está errado")
        }
        super(data)
    }

}
class NumberValidator extends Validator {
    constructor(data:number){
        if(typeof data !== "number"){
            throw new Error("O tipo está errado")
        }
        super(data)
    }
}
class BooleanValidator extends Validator {
    constructor(data:boolean){
        if(typeof data !== "boolean"){
            throw new Error("O tipo está errado")
        }
        super(data)
    }
}


abstract class RegexValidator extends StringValidator{
    protected data_regex : RegExp = new RegExp('');

    constructor(data:any, data_regex: RegExp){
        super(data);
        this.data_regex = data_regex;
        if(!this.regex.test(data)){
            throw new Error("O tipo está errado")
        }else{
            console.log('deu certo!')
        }
    }
    protected get regex(): RegExp {
        return this.data_regex;
    }
}

class EmailInput extends RegexValidator {
    constructor(data:any){
        const data_regex: RegExp = new RegExp(/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim);
        super(data, data_regex);
    }
}
class PasswordInput extends RegexValidator {
    constructor(data:any){
        const data_regex: RegExp = new RegExp(/^\w{1,}$/gim);
        super(data, data_regex);
    }
}
class NameInput extends RegexValidator {
    constructor(data:any){
        const data_regex: RegExp = new RegExp(/^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim);
        super(data, data_regex);
    }
}

/// Testes:

// try{
//     const teste2  =  new EmailInput('teste@gmail.com')
//     console.log(teste2)
//     // const teste  =  new EmailInput('teste.dade@gmail.com')
//     // console.log(teste)
//     const teste3  =  new PasswordInput('teste123')
//     console.log("passwd certo:", teste3)
//     // const teste4  =  new PasswordInput('!@#duahiudahida')
//     // console.log("passwd errado:", teste4)
    // const teste5  =  new NameInput('eduardo Hneiruqe Silva Santos')
    // console.log("Name certo:", teste5)
    // const test6  =  new NameInput('1edu')
    // console.log("name errado:", test6)
// }catch(e){
//     console.log(e)
// }