import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import AccountModel from '../src/model/accountModel.js';
import PostgresModel from '../src/model/postgresModel.js';
import account from './mocks/account.js';
import createPixWithSuccessful from './mocks/pix.js';

chai.use(chaiHttp);

const pixModel = new PostgresModel('pix');
const accountModel = new PostgresModel('account');
const creditCardModel = new PostgresModel('credit_card');

describe('# Pix Tests', () => {
    beforeEach(async function (done) {
        Promise.all(
            pixModel.deleteAll(),
            creditCardModel.deleteAll(),
            accountModel.deleteAll(),
       )

       done();
    });

    afterEach(async function (done) {
       Promise.all(
            pixModel.deleteAll(),
            creditCardModel.deleteAll(),
            accountModel.deleteAll(),
       )

       done();
    });

    it('Should make payment with pix API', async () => {
        const id = await account(accountModel, AccountModel, 'test111@test.com', 'test_01');
        const createPix = await createPixWithSuccessful(id);

        const datas = {
            pix_key: createPix.pix_key,
            value: 6020
        };

        chai.request(app)
            .post('/pix/payment')
            .send(datas)
            .end((error, res) => {
                chai.expect(res.status).to.be.deep.equal(200);
            });
    });
});