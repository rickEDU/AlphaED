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