import axios, {AxiosResponse} from "axios";
import api from "../api";
import {ArticleInterface} from "@/types";
import {pageSize} from "@/constant";

export const getArticleService = async (pageNum:number) => {
    return axios.get(`${api.getCircleArticleList}?pageSize=${pageSize}&pageNum=${pageNum}`)
        .then((res: AxiosResponse<ArticleInterface>) => res.data)
        .catch();
};
