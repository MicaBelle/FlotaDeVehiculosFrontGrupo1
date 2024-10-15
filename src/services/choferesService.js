import { backendUrl } from '../connection/backUrl';
import {executeFetch} from '../connection/fetch'
import {HttpMethods} from '../connection/HttpMethods'



export const registrarChofer = async (data, token) => {
    const endpoint = backendUrl + '/chofer/registrar';
    return await executeFetch(endpoint, data, HttpMethods.GET, token, 200);
};

export const asignarChofer = async (token) => {
    const endpoint = backendUrl + '/chofer/verChofers';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

export const habilitarChofer = async (token) => {
    const endpoint = backendUrl + '/chofer/verChofers';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

export const inhabilitarChofer = async (token) => {
    const endpoint = backendUrl + '/chofer/verChofers';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

export const verChoferes = async (token) => {
    const endpoint = backendUrl + '/chofer/verChofers';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};