import api from "../api";
import {pageSize} from "@/constant";
import {request} from '@/utils';
export const getArticleService = async (pageNum:number,keyword:string) => {
    return request(`${api.getCircleArticleList}?pageSize=${pageSize}&pageNum=${pageNum}&keyword=${keyword}&type=movie`,{method:"get"})
        .then((res:any) => res)
        .catch();
};

export const getCircleArticleCountService = async (id:number) => {
    return request(`${api.getCircleArticleCount}?id=${id}`,{method:"get"})
        .then((res:any)=> res)
        .catch();
};
