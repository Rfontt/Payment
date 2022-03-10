import Connection from "../database/connection.js";

const table = 'pix';
const postgres = Connection.postgres();

export default class PixModel {
    static async findByKey(pix_key) {
        return postgres()
            .select()
            .from(table)
            .where({ pix_key: pix_key });
    }
}