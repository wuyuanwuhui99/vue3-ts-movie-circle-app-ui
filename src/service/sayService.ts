import axios, {AxiosResponse} from "axios";
import api from "../api";
import {HotCommentMovieInterface} from "@/types";

export const getHotCommentMovieService = async () => {
    return axios.get(api.getHotCommentMovie)
        .then((res: AxiosResponse<Array<HotCommentMovieInterface>>) => res.data)
        .catch();
};

export const getLastModifyMovieService = async () => {
    return axios.get(api.getLastModifyMovie)
        .then((res: AxiosResponse<Array<HotCommentMovieInterface>>) => res.data)
        .catch();
};
