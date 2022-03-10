import { Router } from 'express';
import BankPaymentSlipController from '../controller/bankPaymentSlipController.js';

const bankPaymentSlip = Router();

bankPaymentSlip.post('/bankPaymentSlip', BankPaymentSlipController.realizePayment);

export default bankPaymentSlip;