import AccountService from "../services/accountService.js";

export default class AccountController {
    static async create(req, res) {
        const {
            account_name,
            email, 
        } = req.body;

        const datas = {
            account_name,
            email,
        }

        if (
            !account_name ||
            !email
        ) {
            return res.status(400).send({ message: 'Bad request, try again!' })
        }

        const createAccount = await AccountService.create(datas);

        return res.status(createAccount.status).send({ message: createAccount.message });
    }

    static async read(req, res) {
        const readAllAccounts = await AccountService.read();

        return res.status(readAllAccounts.status).send({ accounts: readAllAccounts.message });
    }
}