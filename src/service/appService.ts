import axios, {AxiosResponse} from "axios";
import api from "../api";
import store from "../store";
import {UserDataInterface} from "@/types";
import {USER_DATA} from "@/store/mutation-types";

export const getUserDataService = async (token: string) => {
    return new Promise((async (resolve) => {
        let data = await axios.get(api.getUserData, {headers: {Authorization: token}}).then((res: AxiosResponse<UserDataInterface>) => res.data)
            .catch(() => resolve({}));
        store.commit(USER_DATA, data);
        resolve(data);
    }));
};
