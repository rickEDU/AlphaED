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
Object.defineProperty(exports, "__esModule", { value: true });
const conection_1 = require("../repository/conection");
const TAG = '/SERVICE';
class serviceAccount {
    SvCreate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conected = new conection_1.conection();
                const query = {
                    text: 'insert into accounts(name, email, password) values ($1, $2, $3) returning id,name,email',
                    values: [data.name, data.email, data.password]
                };
                const response = yield conected.execulteQuery(query);
                return response;
            }
            catch (e) {
                console.log(TAG, e);
            }
        });
    }
    SvUpdate(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conected = new conection_1.conection();
                const query = {
                    text: 'update accounts set name=$1, email=$2, password=$3 where id=$4 returning id,name,email',
                    values: [data.name, data.email, data.password, id]
                };
                const response = yield conected.execulteQuery(query);
                return response;
            }
            catch (e) {
                console.log(TAG, e);
                throw e;
            }
        });
    }
    SvLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conected = new conection_1.conection();
                const query = {
                    text: 'select id, email, password from accounts where email=$1',
                    values: [email]
                };
                const response = yield conected.execulteQuery(query);
                return response;
            }
            catch (e) {
                console.log(TAG, e);
                throw e;
            }
        });
    }
}
exports.default = serviceAccount;
