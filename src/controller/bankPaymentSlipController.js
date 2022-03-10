import BankPaymentSlipService from "../services/bankPaymentSlipService.js";

export default class BankPaymentSplipController {
    static async realizePayment(req, res) {
        const {
            sender,
            recipient,
            agency,
            dueDate,
            numberBankPaymentSplip,
            value,
        } = req.body;

        const datas = {
            sender,
            recipient,
            agency,
            dueDate,
            numberBankPaymentSplip,
            value,
        }

        if (
            !sender || !recipient || !agency || !dueDate || !numberBankPaymentSplip ||
            !value 
        ) {
            return res.status(400).send({ message: 'Bad request!' });
        }

        const payment = await BankPaymentSlipService.realizePayment(datas);

        return res.status(payment.status).send({ message: payment.message });
    }
}