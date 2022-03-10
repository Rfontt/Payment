import { Router } from 'express';
import PixController from '../controller/pixController.js';

const pix = Router();

pix.post('/pix', PixController.create);
pix.post('/pix/payment', PixController.realizePayment);

export default pix;