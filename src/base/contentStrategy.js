export default class ContentStrategy {
    constructor(methodPayment) {
        this.methodPayment = methodPayment;
    }

    async payment() {
        return await this.methodPayment.payment();
    }
}