import moment from 'moment';
import ContentStrategy from '../base/contentStrategy.js';
import BankPaymentSplipStrategy from '../strategy/bankPaymentSlipStrategy.js';

export default class BankPaymentSlipService {
    static async realizePayment(datas) {
        const { dueDate } = datas;

        if (!moment(dueDate, "YYYY-MM-DD HH:mm:ss").isValid()) {
            return { status: 400, message: "Date incorrect, try again!" }  
        } 

        try {
            const contentStrategy = new ContentStrategy(new BankPaymentSplipStrategy(datas));
            const payment = await contentStrategy.payment();

            return { status: 200, message: `${payment.sender}, Your payment was successful` };
        } catch(error) {
            return { status: 500, message: 'Error making payment' }
        }
    }
}