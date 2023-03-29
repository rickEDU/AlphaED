"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app_1 = require("./app");
new app_1.App().server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na em http://${process.env.HOST}:${process.env.PORT}`);
});
