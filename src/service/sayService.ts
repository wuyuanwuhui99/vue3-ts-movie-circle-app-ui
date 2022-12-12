import axios, {AxiosResponse} from "axios";
import api from "../api";
import {HotCommentMovieInterface, SayInterface} from "@/types";

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

export const saveSayService = async (data:SayInterface) => {
    return axios.post(api.saveSay,data)
        .then((res: AxiosResponse<Array<HotCommentMovieInterface>>) => res.data)
        .catch();
};
