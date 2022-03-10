import PixStrategy from "../strategy/pixStrategy.js";
import ContentStrategy from "../base/contentStrategy.js";
import PostgresModel from "../model/postgresModel.js";
import PixModel from "../model/pixModel.js";

const model = new PostgresModel('pix');

export default class PixService {
    static async findKey(pix_key) {
        const key = await PixModel.findByKey(pix_key);

        if(key.length === 0) {
            return false;
        } 

        return true;
    }

    static async createKey(datas) {
        const findKey = await this.findKey(datas.pix_key);

        if(!findKey) {
            try {
                await model.create(datas);

                return { status: 201, message: 'Key created with success!' };
            } catch(error) {
                return { status: 500, message: 'Error in create the pix key' };
            }
        } else {
            return { status: 406, message: 'This key already exists!' };
        }
    }

    static async realizePayment(datas) {
        const findKey = await this.findKey(datas.pix_key);

        if (findKey) {            
            try {
                const contentStrategy = new ContentStrategy(new PixStrategy(datas));
                await contentStrategy.payment();

                return { status: 200, message: 'Payment maked with sucess' };
            } catch(error) {
                return { status: 500, message: 'Error making payment with pix!' };
            }
        } else {
            return { status: 404, message: 'The key not exists, try again!' };
        }
    }
}