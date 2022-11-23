import axios, {AxiosResponse} from "axios";
import api from "../api";
import {ArticleInterface} from "@/types";
import {pageSize} from "@/constant";

export const getArticleService = async (pageNum:number) => {
    return axios.get(`${api.getCircleArticleList}?pageSize=${pageSize}&pageNum=${pageNum}&type=movie`)
        .then((res: AxiosResponse<ArticleInterface>) => res.data)
        .catch();
};

export const getCircleArticleCountService = async (id:number) => {
    return axios.get(`${api.getCircleArticleCount}?id=${id}`)
        .then((res: AxiosResponse<ArticleInterface>) => res.data)
        .catch();
};
