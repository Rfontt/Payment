import Connection from "../database/connection.js";

const table = 'account';
const postgres = Connection.postgres();

export default class AccountModel {
    static async findByEmail(email) {
        return postgres()
            .select()
            .from(table)
            .where({ email: email });
    }

    static async edit(condition, value) {
        return postgres()
            .update({ account_money: value })
            .where({ email: condition })
            .from(table);
    }

    static findId(email) {
        return postgres()
            .select(`${table}.id`)
            .from(table)
            .where({ email })
    }
}