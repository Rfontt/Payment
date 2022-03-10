import ContentStrategy from '../base/contentStrategy.js';
import CreditCardStrategy from '../strategy/creditCardStrategy.js';
import CreditCardModel from "../model/creditCardModel.js"
import Date from '../utils/date.js';
import PostgresModel from '../model/postgresModel.js';

const postgres = new PostgresModel('credit_card');

export default class CreditCardService {
    static async create(datas) {
        const dateValid = Date.formatDate(datas.valid);

        const creditCardExists = await this.findByCreditCard(
            datas.number_credit_card,
            datas.cvv,
            dateValid
        );

        datas.valid = dateValid;

        if (!creditCardExists) {
            try {
                await postgres.create(datas);
    
                return { status: 201, message: 'Create with sucess' };
            } catch(error) {
                return { status: 500, message: 'Error in create credit card' };
            }
        } else {
            return { status: 406, message: 'Credit card alredy exists' };
        }
    }

    static async findByCreditCard(number_credit_card, cvv, valid) {
        const existsCreditCard = await CreditCardModel.findByCreditCard(number_credit_card, cvv, valid);

        if (existsCreditCard.length !== 0) {
            return existsCreditCard;
        } else {
            return false;
        }
    }

    static async realizePayment(datas) {
        const dateValid = Date.formatDate(datas.valid);

        const creditCardExists = await this.findByCreditCard(
            datas.number_credit_card,
            datas.cvv,
            dateValid
        );

        if (creditCardExists) {
            try {
                const contentStrategy = new ContentStrategy(new CreditCardStrategy(datas));
                await contentStrategy.payment();
    
                return { status: 200, message: 'Payment made with sucess' };
            } catch(error) {
                console.log(error)
                return { status: 500, message: 'Error making payment' };
            }
        } else {
            return { status: 404, message: 'Credit card not found' };
        }
    }
}