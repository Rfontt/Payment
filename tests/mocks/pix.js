import PixService from "../../src/services/pixService.js";

export default async function createPixWithSuccessful(id) {
    const datas = {
        pix_key: "00019191444491",
        account_id: id
    }

    await PixService.createKey(datas);

    return datas;
}