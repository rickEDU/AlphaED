"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helpers/helper");
class account {
    teste(req, res) {
        return res.status(200).json({ data: 'certo' });
    }
    create(req, res) {
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
            res.status(200).json({ data: req.body, error: null });
        }
        catch (e) {
            res.status(400).json({ data: "error", error: e });
        }
    }
}
exports.default = account;
