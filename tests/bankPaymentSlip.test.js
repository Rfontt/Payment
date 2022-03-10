import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import bankPaymentSlipModel from '../src/model/bankPaymentSlipModel.js'
import BankPaymentSlipService from '../src/services/bankPaymentSlipService.js';

chai.use(chaiHttp);

beforeEach((done) => {
    bankPaymentSlipModel.deleteMany({}, (error) => {
        done();
    });
});

describe('# Bank Payment Slip Unity Tests', () => {
    it('Should send an object with datas corrects and the payment before the due date', async() => {
        const datas = {
            sender: 'Jorge Welf',
            recipient: 'Nubank',
            agency: '0001',
            dueDate: '2022-02-25 18:00:00',
            numberBankPaymentSplip: 1010101,
            value: 200,
        }

        const result = await BankPaymentSlipService.realizePayment(datas);
        const expected = { status: 200, message: 'Jorge Welf, Your payment was successful' }

        chai.expect(result).to.be.deep.equal(expected);
    });

    it('Should return code http 400 when sending an incorrect date', async() => {
        const datas = {
            sender: 'Ollaf Nuff',
            recipient: 'Nubank',
            agency: '0001',
            dueDate: 'aaaaaaaa',
            numberBankPaymentSplip: 121212,
            value: 1000,
        }

        const result = await BankPaymentSlipService.realizePayment(datas);
        const expected = { status: 400, message: "Date incorrect, try again!" } 

        chai.expect(result).to.be.deep.equals(expected);
    });
});

describe('# Bank Payment Slip Api Tests', () => {
    it('Should send object with datas corrects to api with the payment before the due date', () => {        
        const datas = {
            sender: 'Shedaial Obrien',
            recipient: 'Bradesco',
            agency: '0021',
            dueDate: '2022-02-26 22:00:00',
            numberBankPaymentSplip: 189182918,
            value: 100,
        }

        chai.request(app)
            .post('/bankPaymentSlip')
            .send(datas)
            .end((error, res) => {
                chai.expect(res.status).to.be.deep.equal(200);
            });
    });

    it('Should return code http 400 when sending an incorrect date in api', () => {
        const datas = {
            sender: 'Ollaf Nuff',
            recipient: 'Nubank',
            agency: '0001',
            dueDate: 'aaaaaaa',
            numberBankPaymentSplip: 121212,
            value: 1000,
        }

        chai.request(app)
            .post('/bankPaymentSlip')
            .send(datas)
            .end((error, res) => {
                chai.expect(res.status).to.be.deep.equal(400);
            });
    });
});