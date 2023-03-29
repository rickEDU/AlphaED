import Router from "express";
import account from "../controller/accounts";

const router = Router();
const controller = new account()

router.get('/teste', controller.teste)
router.post('/accounts', controller.create)
router.patch('/accounts', controller.update)


export {router};