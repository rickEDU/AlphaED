import Router from "express";
import account from "../controller/accounts";
import auth from "../auth/authenticated";

const router = Router();
const controller = new account()
const aut = new auth()


router.post('/accounts', controller.create)
router.patch('/accounts', aut.authenticated, controller.update)
router.post('/accounts/login', controller.login)


export {router};