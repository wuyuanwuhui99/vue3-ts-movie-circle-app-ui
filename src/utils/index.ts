export const zorefull = (value: number): string | number => {
    return value < 9 ? "0" + value : value
};

export const formateDate = (value: string): string => {
    var date = new Date(value);
    var nowDate = new Date()
    let diff = Math.ceil((nowDate.getTime() - date.getTime()) / 1000);
    if (diff < 60) {
        return diff + "秒前"
    } else if (diff < 60 * 60) {
        return Math.ceil(diff / 60) + "分前"
    } else if (diff < 60 * 60 * 24) {
        return Math.ceil(diff / (60 * 60)) + "小时前"
    } else if (diff < 60 * 60 * 24 * 30) {
        return Math.ceil(diff / (60 * 60 * 24)) + "天前"
    } else if (diff < 60 * 60 * 24 * 30 * 12) {
        return Math.ceil(diff / (60 * 60 * 24 * 30)) + "个月前"
    } else {
        return Math.ceil(diff / (60 * 60 * 24 * 30 * 12)) + "年前"
    }
};

import store from "../store";
import {TOKEN} from "@/store/mutation-types"

export const request = (url:string,options:any)=>{
    const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": store.state.token
    };
    if(!options) {
        options = {
            headers
        }
    }else{
        options.headers = {...options.headers||{},...headers}
    }
    return fetch(url,options).then(res=>res.json()).then((res)=>{
        if(res.data.status=="SUCCESS" && res.data.token){
            store.commit(TOKEN, res.data.token);
        }
        return res;
    })
};
