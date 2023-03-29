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
class account {
    teste(req, res) {
        return res.status(200).json({ data: 'certo' });
    }
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
                res.status(201).json({ data: response, error: null });
            }
            catch (e) {
                res.status(400).json({ data: "error", error: e });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, id } = req.body;
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
                const response = yield service.SvUpdate({ name, email, password }, id);
                console.log(response);
                res.status(200).json({ data: response, error: null });
            }
            catch (e) {
                res.status(400).json({ data: "error", error: e });
            }
        });
    }
}
exports.default = account;
