import Connection from "../database/connection.js";

const table = 'credit_card';
const postgres = Connection.postgres();

export default class CreditCardModel {
    static async findByCreditCard(numberCreditCard, cvv, valid) {
        return postgres()
            .select()
            .from(table)
            .where({ number_credit_card: numberCreditCard })
            .where({ cvv })
            .where({ valid })
    }

    static async updateCreditCard(numberCreditCard, cvv, valid, credit_card_bill, account_id) {
        return postgres()
            .update({ credit_card_bill })
            .from(table)
            .where({ number_credit_card: numberCreditCard })
            .where({ cvv })
            .where({ valid })
            .where({ account_id })
    }
}