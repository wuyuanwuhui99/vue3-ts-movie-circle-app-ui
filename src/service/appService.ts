import api from "../api";
import store from "../store";
import {USER_DATA} from "@/store/mutation-types";
import {request} from '@/utils'
export const getUserDataService = async (token: any) => {
    return new Promise((async (resolve) => {
        let data = await request(api.getUserData, {headers: {Authorization: token}}).then(res => res)
            .catch(() => resolve({}));
        store.commit(USER_DATA, data);
        resolve(data);
    }));
};
