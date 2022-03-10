import chai from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';
import app from '../index.js';
import AccountModel from '../src/model/accountModel.js';
import PostgresModel from '../src/model/postgresModel.js';
import CreditCardService from '../src/services/creditCardService.js';
import Date from '../src/utils/date.js';
import account from './mocks/account.js';
import createCardSuccessful from './mocks/creditCardSuccessful.js';

chai.use(chaiHttp);

const accountModel = new PostgresModel('account');
const creditCardModel = new PostgresModel('credit_card');
const pixModel = new PostgresModel('pix'); 

let id;

describe('# Credit Card Tests', () => {
    beforeEach(async function () {
        id = await account(accountModel, AccountModel, 'test2222@test.com', 'test_02');
    });

    afterEach(async function () {
        await creditCardModel.deleteAll();
        await pixModel.deleteAll();
        await accountModel.deleteAll();
    });
    
    it('Should make a payment with credit card API', async () => {
        const createCreditCard = await createCardSuccessful(id);

        const datas = {
            account_id: id,
            number_credit_card: createCreditCard.number_credit_card,
            cvv: createCreditCard.cvv,
            valid: Date.formatDate(createCreditCard.valid),
            installments: 5,
            value_bought: 1000
        }

        chai.request(app)
            .post('/creditCard/payment')
            .send(datas)
            .end((error, res) => {
                chai.expect(res.status).to.be.deep.equal(200);
            });

        await accountModel.deleteAll();
    });

    it('Should make a payment with credit card unity test', async () => {
        const createCreditCard = await createCardSuccessful(id);

        const datas = {
            account_id: id,
            number_credit_card: createCreditCard.number_credit_card,
            cvv: createCreditCard.cvv,
            valid: Date.formatDate(createCreditCard.valid),
            installments: 5,
            value_bought: 5000
        }

        const result = await CreditCardService.realizePayment(datas);
        const expected = { status: 200, message: 'Payment made with sucess' }

        chai.expect(result).to.be.deep.equal(expected);

        await accountModel.deleteAll();
    });
});