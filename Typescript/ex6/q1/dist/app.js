"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        console.log('Deu certo!');
        this.server = (0, express_1.default)();
        this.midware();
    }
    midware() {
        this.server.use((0, cors_1.default)());
        this.server.use(express_1.default.json());
        this.server.use((0, cookie_parser_1.default)());
        this.server.use(express_1.default.static('./public'));
    }
}
exports.App = App;
