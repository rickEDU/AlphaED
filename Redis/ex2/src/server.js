require('dotenv').config();
const express = require('express');
const router = require('./routes/router');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(bodyParser.json());
app.use(router);


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
