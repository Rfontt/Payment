import CreditCardService from "../../src/services/creditCardService.js";

export default async function createCardSuccessful(id) {
    const datasCreditCard = {
        account_id: id,
        number_credit_card: 101292910,
        cvv: 1111,
        credit_card_bill: 0,
        valid: "03/30"
    }

    await CreditCardService.create(datasCreditCard);

    return datasCreditCard;
}