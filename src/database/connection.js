import mongoose from 'mongoose';
import knex from 'knex';

export default class Connection {
   static mongodb() {
        try {
            const connection = mongoose.connect(
                'mongodb://mongo_payment_db:27017/payments'
            );
    
            return connection;
            
        } catch(error) {
            return error;
        }
    }

    static postgres() {
        try {
            const connection = knex({
                client: 'pg',
                connection: 'postgres://Rfontt:postgress@postgres_payment_db/payment',
            });

            return connection;
        } catch(error) {
            return error;
        }
    }
}