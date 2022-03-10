import CreditCardModel from "../model/creditCardModel.js"
import CreditCardService from "../services/creditCardService.js";
import Date from "../utils/date.js";

export default class CreditCardStrategy {
    constructor(datas) {
        this.account_id = datas.account_id,
        this.number_credit_card = datas.number_credit_card,
        this.cvv = datas.cvv,
        this.valid = datas.valid,
        this.installments = datas.installments,
        this.value_bought = datas.value_bought
    }
    
    async payment() {
        const dateFormated = Date.formatDate(this.valid);
        const existsCreditCard = await CreditCardService.findByCreditCard(this.number_credit_card, this.cvv, dateFormated);

        let creditCardBill;
        
        existsCreditCard.map((item) => {
            creditCardBill = parseInt(item.credit_card_bill);
        });

        const valueWithInstallments = this.value_bought/this.installments;

        creditCardBill += valueWithInstallments;

        return await CreditCardModel.updateCreditCard(this.number_credit_card, this.cvv, dateFormated, creditCardBill, this.account_id)
    }
}