"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Validator {
    constructor(data) {
        this.data = data;
    }
}
class StringValidator extends Validator {
    constructor(data) {
        if (typeof data !== "string") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}
class NumberValidator extends Validator {
    constructor(data) {
        if (typeof data !== "number") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}
class BooleanValidator extends Validator {
    constructor(data) {
        if (typeof data !== "boolean") {
            throw new Error("O tipo está errado");
        }
        super(data);
    }
}
class RegexValidator extends StringValidator {
    constructor(data, data_regex) {
        super(data);
        this.data_regex = new RegExp('');
        this.data_regex = data_regex;
        if (!this.regex.test(data)) {
            throw new Error("O tipo está errado");
        }
        else {
            console.log('deu certo!');
        }
    }
    get regex() {
        return this.data_regex;
    }
}
class EmailValidator extends RegexValidator {
    constructor(data) {
        const data_regex = new RegExp(/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim);
        super(data, data_regex);
    }
}
class PasswordValidator extends RegexValidator {
    constructor(data) {
        const data_regex = new RegExp(/^\w{1,}$/gim);
        super(data, data_regex);
    }
}
class NameValidator extends RegexValidator {
    constructor(data) {
        const data_regex = new RegExp(/^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim);
        super(data, data_regex);
    }
}
class EmailInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'emailInput';
        input.placeholder = "Digite seu email.";
        input.onchange = () => {
            try {
                new EmailValidator(input.value);
            }
            catch (error) {
                input.value = ``;
                console.log(error);
            }
        };
        shadow.append(input);
    }
}
class NameInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'nameInput';
        input.placeholder = "Digite seu nome.";
        input.onchange = () => {
            try {
                new NameValidator(input.value);
            }
            catch (error) {
                input.value = ``;
                console.log(error);
            }
        };
        shadow.appendChild(input);
    }
}
class PasswordInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'passwordInput';
        input.placeholder = "Digite sua senha.";
        input.onchange = () => {
            try {
                new PasswordValidator(input.value);
            }
            catch (error) {
                input.value = ``;
                console.log(error);
            }
        };
        shadow.append(input);
    }
}
customElements.define("email-input", EmailInput);
customElements.define("name-input", NameInput);
customElements.define("passwd-input", PasswordInput);
function createAcount() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const button = document.querySelector('.create');
        button.disabled = true;
        const shadow_email = (_a = document.querySelector('email-input')) === null || _a === void 0 ? void 0 : _a.shadowRoot;
        const email = shadow_email === null || shadow_email === void 0 ? void 0 : shadow_email.querySelector('.emailInput');
        // valor do input nome
        const shadow_name = (_b = document.querySelector("name-input")) === null || _b === void 0 ? void 0 : _b.shadowRoot;
        const name = shadow_name === null || shadow_name === void 0 ? void 0 : shadow_name.querySelector('.nameInput');
        // valor do input senha
        const shadow_password = (_c = document.querySelector('passwd-input')) === null || _c === void 0 ? void 0 : _c.shadowRoot;
        const password = shadow_password === null || shadow_password === void 0 ? void 0 : shadow_password.querySelector('.passwordInput');
        try {
            if (email.value.length == 0) {
                throw new Error('Digite um email!');
            }
            if (name.value.length == 0) {
                throw new Error('Digite um nome!');
            }
            if (password.value.length == 0) {
                throw new Error('Digite uma senha!');
            }
            const body = {
                email: email.value,
                name: name.value,
                password: password.value
            };
            yield fetch_create(body);
            button.disabled = false;
        }
        catch (error) {
            button.disabled = false;
            const message = document.querySelector('#message');
            message.innerHTML = error;
            message.style.color = 'red';
            setTimeout(() => {
                message.innerHTML = '';
            }, 4000);
            console.log(error);
        }
    });
}
function updateAcount() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const button = document.querySelector('.update');
        button.disabled = true;
        // valor do input da email
        const shadow_email = (_a = document.querySelector('email-input')) === null || _a === void 0 ? void 0 : _a.shadowRoot;
        const email = shadow_email === null || shadow_email === void 0 ? void 0 : shadow_email.querySelector('.emailInput');
        // valor do input nome
        const shadow_name = (_b = document.querySelector("name-input")) === null || _b === void 0 ? void 0 : _b.shadowRoot;
        const name = shadow_name === null || shadow_name === void 0 ? void 0 : shadow_name.querySelector('.nameInput');
        // valor do input senha
        const shadow_password = (_c = document.querySelector('passwd-input')) === null || _c === void 0 ? void 0 : _c.shadowRoot;
        const password = shadow_password === null || shadow_password === void 0 ? void 0 : shadow_password.querySelector('.passwordInput');
        try {
            if (email.value.length == 0) {
                throw new Error('Digite um email!');
            }
            if (name.value.length == 0) {
                throw new Error('Digite um nome!');
            }
            if (password.value.length == 0) {
                throw new Error('Digite uma senha!');
            }
            const body = {
                email: email.value,
                name: name.value,
                password: password.value
            };
            yield fetch_update(body);
            button.disabled = false;
        }
        catch (error) {
            button.disabled = false;
            const message = document.querySelector('#message');
            message.innerHTML = error;
            message.style.color = 'red';
            setTimeout(() => {
                message.innerHTML = '';
            }, 4000);
            console.log(error);
        }
    });
}
function loginAcount() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const button = document.querySelector('.login');
        button.disabled = true;
        // valor do input da email
        const shadow_email = (_a = document.querySelector('email-input')) === null || _a === void 0 ? void 0 : _a.shadowRoot;
        const email = shadow_email === null || shadow_email === void 0 ? void 0 : shadow_email.querySelector('.emailInput');
        // valor do input nome
        const shadow_name = (_b = document.querySelector("name-input")) === null || _b === void 0 ? void 0 : _b.shadowRoot;
        const name = shadow_name === null || shadow_name === void 0 ? void 0 : shadow_name.querySelector('.nameInput');
        // valor do input senha
        const shadow_password = (_c = document.querySelector('passwd-input')) === null || _c === void 0 ? void 0 : _c.shadowRoot;
        const password = shadow_password === null || shadow_password === void 0 ? void 0 : shadow_password.querySelector('.passwordInput');
        try {
            if (email.value.length == 0) {
                throw new Error('Digite um email!');
            }
            if (password.value.length == 0) {
                throw new Error('Digite uma senha!');
            }
            const body = {
                email: email.value,
                password: password.value
            };
            yield fetch_login(body);
            button.disabled = false;
        }
        catch (error) {
            button.disabled = false;
            const message = document.querySelector('#message');
            message.innerHTML = error;
            message.style.color = 'red';
            setTimeout(() => {
                message.innerHTML = '';
            }, 4000);
            console.log(error);
        }
    });
}
function fetch_create(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify(body)
            };
            const response = yield fetch('http://localhost:8000/accounts', options);
            const json = yield response.json();
            return json;
        }
        catch (error) {
            console.log(error);
        }
    });
}
function fetch_login(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify(body)
            };
            const response = yield fetch('http://localhost:8000/accounts/login', options);
            const json = yield response.json();
            return json;
        }
        catch (error) {
            console.log(error);
        }
    });
}
function fetch_update(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify(body)
            };
            const response = yield fetch('http://localhost:8000/accounts', options);
            const json = yield response.json();
            return json;
        }
        catch (error) {
            console.log(error);
        }
    });
}