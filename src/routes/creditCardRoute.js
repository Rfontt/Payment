import { Router } from 'express';
import CreditCardController from '../controller/creditCardController.js';

const creditCard = Router();

creditCard.post('/creditCard', CreditCardController.create);
creditCard.post('/creditCard/payment', CreditCardController.realizePayment);

export default creditCard;