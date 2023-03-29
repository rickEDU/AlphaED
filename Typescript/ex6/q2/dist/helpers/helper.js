"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameValidator = exports.PasswordValidator = exports.EmailValidator = void 0;
class RegexValidator {
    constructor(data, data_regex, type) {
        this.fail = false;
        this.data_regex = new RegExp('');
        this.data_regex = data_regex;
        if (!this.regex.test(data)) {
            this.message = `Error: ${type}`;
            this.fail = true;
        }
        else {
            this.message = 'Sucess';
        }
    }
    get regex() {
        return this.data_regex;
    }
}
class EmailValidator extends RegexValidator {
    constructor(data) {
        const data_regex = new RegExp(/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim);
        super(data, data_regex, 'O Email inválido');
    }
}
exports.EmailValidator = EmailValidator;
class PasswordValidator extends RegexValidator {
    constructor(data) {
        const data_regex = new RegExp(/^\w{1,}$/gim);
        super(data, data_regex, 'A senha inválida');
    }
}
exports.PasswordValidator = PasswordValidator;
class NameValidator extends RegexValidator {
    constructor(data) {
        const data_regex = new RegExp(/^[a-z]{1,}$/gim);
        super(data, data_regex, 'O nome inválido');
    }
}
exports.NameValidator = NameValidator;
