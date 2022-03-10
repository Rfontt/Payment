export default async function account(accountModel, AccountModel, email, account_name) {
    const datasAccount = {
        account_name: account_name,
        email: email
    }

    await accountModel.create(datasAccount);
    const findId = await AccountModel.findId(email)

    return findId[0].id;
}