import moment from "moment";

export default class Date {
    static dateFormat(date) {
        const month = date.substring(0, date.indexOf('/'));
        const year = date.substring(date.indexOf('/') + 1);
        const yearCurrent = moment().format('YYYY');
        const firstDigits = yearCurrent.substring(0, 2);
        const dateFormated = `${firstDigits}${year}-${month}-01 00:00:00`;

        return dateFormated;
    }

    static formatDate(dateCreditCard) {
        const formatDate = this.dateFormat(dateCreditCard);
        const dateValid = moment(new Date(formatDate)).format('YYYY-MM-DD HH:mm:ss')

        return dateValid;
    }
}