import AccountModel from "../model/accountModel.js";
import PostgresModel from "../model/postgresModel.js";

const model = new PostgresModel('account');

export default class AccountService {
    static async edit(email, account_money) {
        try {
            await AccountModel.editAccount(email, account_money);

            return true;
        } catch(error) {
            return error;
        }
    }

    static async findByEmail(email) {
        return await AccountModel.findByEmail(email);
    } 

    static async create(datas) {
        const { email } = datas;
        const accountExists = await this.findByEmail(email);

       try {
            if (accountExists.length === 0){
                await model.create(datas);

                return { status: 201, message: 'Account created with success.' };
            }

            return { status: 406, message: 'There is a conflict, you already have an account' };
       } catch(error) {
            return { status: 500, message: 'Error creating account' };
       }
    }

    static async read() {
        const readAllAccounts = await model.read();

        if (readAllAccounts.length === 0) {
            return { status: 400, message: 'Not found accounts' }
        }

        return { status: 200, message: readAllAccounts };
    }
}