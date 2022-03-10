import { Router } from "express";
import AccountController from "../controller/accountController.js";

const account = Router();

account.get('/account', AccountController.read);
account.post('/account', AccountController.create);

export default account;