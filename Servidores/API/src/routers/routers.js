const express = require('express')
const routes = express.Router()
const func = require('../func/functions')

routes.get("/users", func.get_all_user)
routes.get("/users/:id", func.get_id_user)
routes.post("/users/", func.add_user)
routes.patch("/users/:id", func.update_user)
routes.delete("/users/:id", func.delete_user)


module.exports = routes