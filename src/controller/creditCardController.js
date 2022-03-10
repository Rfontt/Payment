import CreditCardService from "../services/creditCardService.js"

export default class CreditCardController {
    static async create(req, res) {
        const {
            account_id,
            number_credit_card,
            cvv,
            credit_card_bill,
            valid,
        } = req.body;

        const datas = {
            account_id,
            number_credit_card,
            cvv,
            credit_card_bill,
            valid,
        };

        if (
            !account_id,
            !number_credit_card,
            !cvv,
            !credit_card_bill,
            !valid
        ) {
            return res.status(400).send({ Message: 'Bad request' });
        }

        const createCreditCard = await CreditCardService.create(datas);

        return res.status(createCreditCard.status).send(createCreditCard.message);
    }

    static async realizePayment(req, res) {
        const {
            account_id,
            number_credit_card,
            cvv,
            valid,
            installments,
            value_bought
        } = req.body;

        const datas = {
            account_id,
            number_credit_card,
            cvv,
            valid,
            installments,
            value_bought
        };

        if (
            !account_id,
            !number_credit_card,
            !cvv,
            !valid,
            !installments,
            !value_bought
        ) {
            return res.status(400).send({ Message: 'Bad request' });
        }

       const payment = await CreditCardService.realizePayment(datas);

       return res.status(payment.status).send(payment.message);
    }
}