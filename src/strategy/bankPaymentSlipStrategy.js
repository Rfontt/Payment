import moment from "moment";
import bankPaymentSlipSchema from "../model/bankPaymentSlipModel.js";

export default class BankPaymentSplipStrategy {
    constructor(datas) {
        this.sender = datas.sender;
        this.recipient = datas.recipient;
        this.agency = datas.agency;
        this.dueDate = moment(datas.dueDate).format('YYYY-MM-DD HH:mm:ss');
        this.numberBankPaymentSplip = datas.numberBankPaymentSplip;
        this.value = datas.value;
        this.dateNow = moment(new Date());
    }
    
    async payment() {
        let bankPaymentSplipValueFinal = this.value;

        if (moment(this.dateNow).format('YYYY-MM-DD HH:mm:ss') > this.dueDate) {
            const duration = moment.duration(this.dateNow.diff(this.dueDate));
            const delayedDays = duration.asDays().toFixed(0);

            const porcentageFine = 2/100;
            const percentageForDayInterestRate = (1/30).toFixed(3);
            
            const percentageInterestRateAllDelayedDays = (percentageForDayInterestRate * delayedDays)/100;
            const interstRateFinal = parseFloat((this.value * percentageInterestRateAllDelayedDays).toFixed(2));
            const fineFinal = parseFloat(porcentageFine * this.value);

            bankPaymentSplipValueFinal = this.value + fineFinal + interstRateFinal;
        }

        const makePayment = await bankPaymentSlipSchema.create({ sender: this.sender, bank: this.recipient, value: bankPaymentSplipValueFinal });

        return makePayment;
    }
}