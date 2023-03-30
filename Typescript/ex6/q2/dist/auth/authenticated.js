"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TAG = '/AUTHENTICATED ';
class auth {
    authenticated(req, res, next) {
        try {
            if (req.cookies.session == undefined) {
                throw 'Error: User is not logged in.';
            }
            const secretKey = process.env.JWTSECRET;
            if (!secretKey) {
                throw 'Error: SecretKey is not a string.';
            }
            const decodedJwt = jsonwebtoken_1.default.verify(req.cookies.session, secretKey);
            req.body.decoded = decodedJwt;
            return next();
        }
        catch (e) {
            console.log(TAG, e);
            res.status(400).json({ message: "Error", code: 400, data: null, error: e });
        }
    }
}
exports.default = auth;
