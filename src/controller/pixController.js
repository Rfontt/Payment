import PixService from "../services/pixService.js";

export default class PixController {
    static async create(req, res) {
        const {
            pix_key,
            account_id
        } = req.body;

        const datas = {
            pix_key,
            account_id
        }

        if (
            !pix_key,
            !account_id
        ) {
            return res.status(400).send({ Message: 'Bad request' });
        }
        
        const createKey = await PixService.createKey(datas);
        
        return res.status(createKey.status).send(createKey.message);
    }

    static async realizePayment(req, res) {
        const {
            pix_key,
            value,
        } = req.body;

        const datas = {
            pix_key,
            value,
        }

        if (
            !pix_key,
            !value
        ) {
            return res.status(400).send({ Message: 'Bad request' });
        }

        const payment = await PixService.realizePayment(datas);

        return res.status(payment.status).send({ message: payment.message });
    }
}