"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const accounts_1 = __importDefault(require("../controller/accounts"));
const authenticated_1 = __importDefault(require("../auth/authenticated"));
const router = (0, express_1.default)();
exports.router = router;
const controller = new accounts_1.default();
const aut = new authenticated_1.default();
router.post('/accounts', controller.create);
router.patch('/accounts', aut.authenticated, controller.update);
router.post('/accounts/login', controller.login);
