import axios from "axios";
import { DOMAIN,TOKEN } from "../utilities/settings/config";

export class BaseSevices { // for User

    get(url) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: { "Authorization": `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }
    post(url, values) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: values,
            headers: { "Authorization": `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }
    delete(url) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }
    put(url, values) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: values,
            headers: { "Authorization": `Bearer ${localStorage.getItem(TOKEN)}` }
        })
    }

    
}

export const baseSevices = new BaseSevices();