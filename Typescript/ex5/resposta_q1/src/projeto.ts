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

class EmailValidator extends RegexValidator {
    constructor(data:any){
        const data_regex: RegExp = new RegExp(/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim);
        super(data, data_regex);
    }
}
class PasswordValidator extends RegexValidator {
    constructor(data:any){
        const data_regex: RegExp = new RegExp(/^\w{1,}$/gim);
        super(data, data_regex);
    }
}
class NameValidator extends RegexValidator {
    constructor(data:any){
        const data_regex: RegExp = new RegExp(/^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim);
        super(data, data_regex);
    }
}

class EmailInput extends HTMLElement {
    constructor(){
        super();

        const shadow = this.attachShadow({mode: "open"})
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'emailInput'
        input.placeholder = "Digite seu email."
        input.onchange = () => {
            try{
                new EmailValidator(input.value);
            }catch(error){
                input.value = ``
                console.log(error)
            }
        }
        shadow.append(input)
    }
}
class NameInput extends HTMLElement {
    constructor(){
        super();

        const shadow = this.attachShadow({mode: 'open'})
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'nameInput'
        input.placeholder = "Digite seu nome."
        input.onchange = () => {
            try{
                new NameValidator(input.value);
            }catch(error){
                input.value = ``
                console.log(error)
            }
            
        }
        shadow.appendChild(input)
    }
}
class PasswordInput extends HTMLElement {
    constructor(){
        super();

        const shadow = this.attachShadow({mode: "open"})
        const input = document.createElement('input')
        input.type = 'text';
        input.className = 'passwordInput'
        input.placeholder = "Digite sua senha."
        input.onchange = () => {
            try{
                new PasswordValidator(input.value);
            }catch(error){
                input.value = ``
                console.log(error)
            }

        }
        shadow.append(input)
        

    }

}

interface APIResponse<T> {
    data: T,
    error: Array<string>
}
interface IUserData {
    id: number,
    email: string,
    name: string
}
interface LoginData {
    id: number
}

customElements.define("email-input", EmailInput)
customElements.define("name-input", NameInput)
customElements.define("passwd-input", PasswordInput)

const create = document.querySelector('.create')
const login = document.querySelector('.login')
const update = document.querySelector('.update')
create?.addEventListener('click', createAcount)
login?.addEventListener('click', loginAcount)
update?.addEventListener('click', updateAcount)
async function createAcount() {
    const button = document.querySelector('.create') as HTMLInputElement
    button.disabled = true
    const shadow_email = document.querySelector('email-input')?.shadowRoot;
    const email = shadow_email?.querySelector('.emailInput') as HTMLInputElement

    // valor do input nome
    const shadow_name = document.querySelector("name-input")?.shadowRoot;
    const name = shadow_name?.querySelector('.nameInput') as HTMLInputElement

    // valor do input senha
    const shadow_password = document.querySelector('passwd-input')?.shadowRoot;
    const password = shadow_password?.querySelector('.passwordInput') as HTMLInputElement

    try{
        if(email.value.length==0){
            throw new Error('Digite um email!');
        }
        if(name.value.length==0){
            throw new Error('Digite um nome!');
        }
        if(password.value.length==0){
            throw new Error('Digite uma senha!');
        }
        const body: object = {
            email: email.value,
            name: name.value,
            password: password.value
        }
        await fetch_create(body);
        button.disabled = false

    }catch(error:any){
        button.disabled = false
        const message = document.querySelector('#message') as HTMLDivElement
        message.innerHTML = error
        message.style.color = 'red'
        setTimeout(() => {
            message.innerHTML = ''
        }, 4000);
        console.log(error)
    }
} 
async function updateAcount() {
    const button = document.querySelector('.update') as HTMLInputElement
    button.disabled = true
    // valor do input da email
    const shadow_email = document.querySelector('email-input')?.shadowRoot;
    const email = shadow_email?.querySelector('.emailInput') as HTMLInputElement

    // valor do input nome
    const shadow_name = document.querySelector("name-input")?.shadowRoot;
    const name = shadow_name?.querySelector('.nameInput') as HTMLInputElement

    // valor do input senha
    const shadow_password = document.querySelector('passwd-input')?.shadowRoot;
    const password = shadow_password?.querySelector('.passwordInput') as HTMLInputElement

    try{
        if(email.value.length==0){
            throw new Error('Digite um email!');
        }
        if(name.value.length==0){
            throw new Error('Digite um nome!');
        }
        if(password.value.length==0){
            throw new Error('Digite uma senha!');
        }
        const body: object = {
            email: email.value,
            name: name.value,
            password: password.value
        }
        await fetch_update(body)
        button.disabled = false

    }catch(error:any){
        button.disabled = false
        const message = document.querySelector('#message') as HTMLDivElement
        message.innerHTML = error
        message.style.color = 'red'
        setTimeout(() => {
            message.innerHTML = ''
        }, 4000);
        console.log(error)
    }
} 

async function loginAcount() {
    const button = document.querySelector('.login') as HTMLInputElement
    button.disabled = true
    // valor do input da email
    const shadow_email = document.querySelector('email-input')?.shadowRoot;
    const email = shadow_email?.querySelector('.emailInput') as HTMLInputElement

    // valor do input nome
    const shadow_name = document.querySelector("name-input")?.shadowRoot;
    const name = shadow_name?.querySelector('.nameInput') as HTMLInputElement

    // valor do input senha
    const shadow_password = document.querySelector('passwd-input')?.shadowRoot;
    const password = shadow_password?.querySelector('.passwordInput') as HTMLInputElement

    try{
        if(email.value.length==0){
            throw new Error('Digite um email!');
        }
        if(password.value.length==0){
            throw new Error('Digite uma senha!');
        }
        const body: object = {
            email: email.value,
            password: password.value
        }
        await fetch_login(body)
        button.disabled = false

    }catch(error:any){
        button.disabled = false
        const message = document.querySelector('#message') as HTMLDivElement
        message.innerHTML = error
        message.style.color = 'red'
        setTimeout(() => {
            message.innerHTML = ''
        }, 4000);
        console.log(error)
    }
} 


async function fetch_create(body:object){
    try{
        const options : RequestInit = {
            method: "POST",
            headers: {"Content-Type":"Application/json"},
            body: JSON.stringify(body)
        }
        const response: Response = await fetch('http://localhost:8000/accounts', options)
        const json: APIResponse<IUserData> = await response.json()
        return json;
    }catch(error:any){
        console.log(error)
    }
}

async function fetch_login(body:object){
    try{
        const options : RequestInit = {
            method: "POST",
            headers: {"Content-Type":"Application/json"},
            body: JSON.stringify(body)
        }
        const response: Response = await fetch('http://localhost:8000/accounts/login', options)
        const json: APIResponse<LoginData> = await response.json()

        return json;
    }catch(error:any){
        console.log(error)
    }
}

async function fetch_update(body:object){
    try{
        const options : RequestInit = {
            method: "POST",
            headers: {"Content-Type":"Application/json"},
            body: JSON.stringify(body)
        }
        const response: Response = await fetch('http://localhost:8000/accounts', options)
        const json: APIResponse<IUserData> = await response.json()

        return json;
    }catch(error:any){
        console.log(error)
    }
}