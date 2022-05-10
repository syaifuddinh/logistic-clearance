import axios from "axios";
import config from "../../config";

type IForm = {
    id?: string;
    transactionName: string;
    transactionAlias: string;
    tableName: string;
}

const list = async () => {
    return await axios.get(
        `${config.urls.sp2Server}/Master/ListTransactionType`
    );
};

const store = async (formData: IForm) => {
    let headers: any = config.headerBase();
    let data: any = formData;
    return await axios.post(
        `${config.urls.sp2Server}/Master/SaveTransactionType`,
        data,
        {
            headers: headers
        }
    );
};

const TransactionType = {
    list: list,
    showByAlias: async alias => {
        let dt: any = {};
        let row: any = {};
        try {
            dt = await list();
            row = dt.find(x => x.transactionAlias == alias);
            if (!row) {
                row = {};
            }
        } catch (e) {}

        return row;
    },
    show: async id => {
        let resp: any = {};
        let row: any = {};
        let dt: any = {};
        try {
            dt = await list();
            dt = dt.data;
            row = dt.find(v => v.id === id);
            if (row) {
                resp = row;
            }
        } catch (e) {}

        return resp;
    },
    store: store,
    update: async (formData: IForm, id: string) => {
        let data: any = formData;
        let resp: any = {};
        data.id = id;
        resp = await store(data);

        return resp;
    },
};

export default TransactionType;
