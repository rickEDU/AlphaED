const express = require('express')
const route = express.Router()
const op = require('../controller/operators')

route.get('/planet', op.select)
route.get('/teste', op.getPlanetById)

module.exports = route