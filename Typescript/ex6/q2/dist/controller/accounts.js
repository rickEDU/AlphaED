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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helpers/helper");
const accounts_1 = __importDefault(require("../service/accounts"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TAG = '/CONTROLLER ';
class account {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const validatorName = new helper_1.NameValidator(name);
                const validatorEmail = new helper_1.EmailValidator(email);
                const validatorPassword = new helper_1.PasswordValidator(password);
                if (validatorName.fail) {
                    throw validatorName.message;
                }
                else if (validatorEmail.fail) {
                    throw validatorEmail.message;
                }
                else if (validatorPassword.fail) {
                    throw validatorPassword.message;
                }
                const service = new accounts_1.default;
                const response = yield service.SvCreate({ name, email, password });
                if (!response) {
                    throw 'Account creation error';
                }
                res.status(201).json({ message: "Sucess", code: 201, data: response, error: null });
            }
            catch (e) {
                console.log(TAG, e);
                res.status(400).json({ message: "Error", code: 400, data: null, error: e });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, decoded } = req.body;
                const validatorName = new helper_1.NameValidator(name);
                const validatorEmail = new helper_1.EmailValidator(email);
                const validatorPassword = new helper_1.PasswordValidator(password);
                if (validatorName.fail) {
                    throw validatorName.message;
                }
                else if (validatorEmail.fail) {
                    throw validatorEmail.message;
                }
                else if (validatorPassword.fail) {
                    throw validatorPassword.message;
                }
                const service = new accounts_1.default;
                const response = yield service.SvUpdate({ name, email, password }, decoded.id);
                if (!response) {
                    return res.status(404).json({ message: "Error", code: 404, data: null, error: 'Account Not Found' });
                }
                res.status(200).json({ message: "Sucess", code: 200, data: response, error: null });
            }
            catch (e) {
                console.log(TAG, e);
                res.status(400).json({ message: "Error", code: 400, data: null, error: e });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const validatorEmail = new helper_1.EmailValidator(email);
                const validatorPassword = new helper_1.PasswordValidator(password);
                if (validatorEmail.fail) {
                    throw validatorEmail.message;
                }
                else if (validatorPassword.fail) {
                    throw validatorPassword.message;
                }
                const service = new accounts_1.default;
                const response = yield service.SvLogin(email);
                if (!response) {
                    return res.status(404).json({ message: "Error", code: 404, data: null, error: 'Account Not Found' });
                }
                if (response.password != password) {
                    return res.status(403).json({ message: "Error", code: 403, data: null, error: 'Forbiden' });
                }
                const secretKey = process.env.JWTSECRET;
                if (!secretKey) {
                    throw 'Error: SecretKey is not a string.';
                }
                const jwt_cookie = jsonwebtoken_1.default.sign({ id: response.id }, secretKey);
                res.cookie("session", jwt_cookie, { maxAge: 300000 });
                res.status(200).json({ message: "Sucess", code: 200, data: { id: response.id }, error: null });
            }
            catch (e) {
                console.log(TAG, e);
                res.status(400).json({ message: "Error", code: 400, data: null, error: e });
            }
        });
    }
}
exports.default = account;
