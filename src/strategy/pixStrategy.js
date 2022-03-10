import AccountModel from "../model/accountModel.js";
import PostgresModel from "../model/postgresModel.js";

export default class PixStrategy {
    constructor(datas) {
        this.key = datas.pix_key;
        this.value = datas.value;
    }

    async payment() {
        let accountMoney;
        let email;

        const model = new PostgresModel('pix');
        const accountDatas = await model.tableJoin('pix', 'account');

        accountDatas.map((item) => {
            accountMoney = item.account_money;
            email = item.email;
        });

        if (accountMoney === null) {
            accountMoney = 0;
        } else {
            accountMoney = parseInt(accountMoney);
        }

        const newAccountMoney = accountMoney + this.value;

        const editAccount_Money = await AccountModel.edit(email, newAccountMoney, 'account');

        return editAccount_Money;
    }
}