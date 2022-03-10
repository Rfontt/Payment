import Connection from "../database/connection.js";

const postgres = Connection.postgres();

export default class PostgresModel {
    constructor(table) {
        this.table = table;
    }

    async create(datas) {
        return postgres()
            .insert(datas)
            .into(this.table);
    }

    async read(item) {
        return postgres()
            .select()
            .from(this.table);
    }

    async tableJoin(table1, table2) {
        return postgres()
            .select('*')
            .from(`${table1}`)
            .join(`${table2}`, function() {
                    this.on(function() {
                    this.on(`${table1}.account_id`, '=', `${table2}.id`);
                });
            });
    }

    async deleteAll() {
        return postgres()
            .delete()
            .from(this.table);
    }

    async deleteByID(account_id) {
        return postgres()
            .delete()
            .where({ account_id })
            .from(this.table);
    }
}