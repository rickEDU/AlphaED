"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameValidator = exports.PasswordValidator = exports.EmailValidator = void 0;
class RegexValidator {
    constructor(data, data_regex, type) {
        this.data_regex = new RegExp('');
        this.data_regex = data_regex;
        if (!this.regex.test(data)) {
            throw `Error: ${type}`;
        }
    }
    get regex() {
        return this.data_regex;
    }
}
class EmailValidator extends RegexValidator {
    constructor(data) {
        const data_regex = new RegExp(/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim);
        super(data, data_regex, 'Email inválido');
    }
}
exports.EmailValidator = EmailValidator;
class PasswordValidator extends RegexValidator {
    constructor(data) {
        const data_regex = new RegExp(/^\w{1,}$/gim);
        super(data, data_regex, 'Senha inválida');
    }
}
exports.PasswordValidator = PasswordValidator;
class NameValidator extends RegexValidator {
    constructor(data) {
        //Regex que pega um nome completo 
        // const data_regex: RegExp = new RegExp(/^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim);
        //Esse de baixo pega só um nome sem espaços, colocou espaços da erro: 
        const data_regex = new RegExp(/^[a-z]{1,}$/gim);
        super(data, data_regex, 'Nome inválido');
    }
}
exports.NameValidator = NameValidator;
