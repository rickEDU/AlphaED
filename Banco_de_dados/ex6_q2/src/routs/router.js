const express = require('express')
const route = express.Router()
const op = require('../controller/operators.js')


route.post('/order', op.insertProduct)

module.exports = route