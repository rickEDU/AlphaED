const express = require('express')
const route = express.Router()
const op = require('../controller/operators.js')


route.post('/teste', op.insertProduct)

module.exports = route