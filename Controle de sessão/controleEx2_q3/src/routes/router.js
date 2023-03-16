const express = require('express')
const router  = express.Router()
const user_controler = require('../controller/user')
const session_controler = require('../controller/session')



router.get('/user/:id', user_controler.get_user)
router.post('/user', session_controler.authenticate, user_controler.post_user)


router.post('/session', session_controler.post_session)
router.get('/session', session_controler.authenticate ,session_controler.protected)
router.get('/logout', session_controler.logout)


module.exports = router;