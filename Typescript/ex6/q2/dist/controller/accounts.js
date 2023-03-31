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
const validators_1 = require("../helpers/validators");
const accounts_1 = __importDefault(require("../service/accounts"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TAG = '/CONTROLLER ';
class account {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_response = {
                message: 'Sucess',
                code: 201,
                data: {
                    id: 0,
                    email: '',
                    name: ''
                },
                error: [null]
            };
            const API_error = {
                message: 'Error',
                code: 400,
                data: null,
                error: [null]
            };
            try {
                const { name, email, password } = req.body;
                new validators_1.NameValidator(name);
                new validators_1.EmailValidator(email);
                new validators_1.PasswordValidator(password);
                const service = new accounts_1.default;
                const response = yield service.SvCreate({ name, email, password });
                if (!response) {
                    throw 'Error: Account creation error';
                }
                API_response.data = response;
                res.status(API_response.code).json(API_response);
            }
            catch (e) {
                console.log(TAG, e);
                API_error.error = [e];
                res.status(API_error.code).json(API_error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_response = {
                message: 'Sucess',
                code: 200,
                data: {
                    id: 0,
                    email: '',
                    name: ''
                },
                error: [null]
            };
            const API_error = {
                message: 'Error',
                code: 400,
                data: null,
                error: [null]
            };
            try {
                const { name, email, decoded } = req.body;
                new validators_1.NameValidator(name);
                new validators_1.EmailValidator(email);
                let body = { name: name, email: email };
                if (req.body.password != undefined) {
                    body.password = req.body.password;
                    new validators_1.PasswordValidator(body.password);
                }
                const service = new accounts_1.default;
                const search = yield service.SvSearch(decoded.id);
                if (!search) {
                    API_error.code = 404;
                    API_error.error = ['Error: Account Not Found.'];
                    return res.status(API_error.code).json(API_error);
                }
                const response = yield service.SvUpdate(search, body, decoded.id);
                if (!response) {
                    API_error.error = ['Error: Internal error.'];
                    return res.status(API_error.code).json(API_error);
                }
                API_response.data = response;
                res.status(API_response.code).json(API_response);
            }
            catch (e) {
                console.log(TAG, e);
                API_error.error = [e];
                return res.status(API_error.code).json(API_error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_response = {
                message: 'Sucess',
                code: 200,
                data: {
                    id: 0
                },
                error: [null]
            };
            const API_error = {
                message: 'Error',
                code: 400,
                data: null,
                error: [null]
            };
            try {
                const { email, password } = req.body;
                new validators_1.EmailValidator(email);
                new validators_1.PasswordValidator(password);
                const service = new accounts_1.default;
                const response = yield service.SvLogin(email);
                if (!response) {
                    API_error.code = 404;
                    API_error.error = ['Error: Account Not Found'];
                    return res.status(API_error.code).json(API_error);
                }
                if (response.password != password) {
                    API_error.code = 403;
                    API_error.error = ['Error: Forbiden'];
                    return res.status(API_error.code).json(API_error);
                }
                const secretKey = process.env.JWTSECRET;
                if (!secretKey) {
                    throw 'Error: SecretKey is not a string.';
                }
                const jwt_cookie = jsonwebtoken_1.default.sign({ id: response.id }, secretKey);
                res.cookie("session", jwt_cookie, { maxAge: 300000 });
                if (!API_response.data) {
                    throw 'Error: Response error.';
                }
                API_response.data.id = response.id;
                return res.status(API_response.code).json(API_response);
            }
            catch (e) {
                console.log(TAG, e);
                API_error.error = [e];
                return res.status(API_error.code).json(API_error);
            }
        });
    }
}
exports.default = account;
