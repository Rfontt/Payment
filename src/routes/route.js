import { Router } from 'express';
import Account from './accountRoute.js';
import BankPaymentSlip from './bankPaymentSlipRoute.js';
import CreditCard from './creditCardRoute.js';
import Pix from './pixRoute.js';

const route = Router();

route.use(CreditCard);
route.use(Pix);
route.use(BankPaymentSlip);
route.use(Account);

export default route;
