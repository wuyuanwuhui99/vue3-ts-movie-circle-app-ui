import api from "../api";
import {SayInterface} from "@/types";
import {request} from '@/utils';
export const getHotCommentMovieService = async () => {
    return request(api.getHotCommentMovie,{method:"get"})
        .then((res:any) => res.data)
        .catch();
};

export const getLastModifyMovieService = async () => {
    return request(api.getLastModifyMovie,{method:"get"})
        .then((res:any) => res.data)
        .catch();
};

export const saveSayService = async (data:SayInterface) => {
    return request(api.saveSay,{headers:"get",body:JSON.stringify(data)})
        .then((res: any) => res.data)
        .catch();
};
