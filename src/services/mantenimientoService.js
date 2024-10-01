import { executeFetch } from "./fetch";
import { HttpMethods } from "./HttpMethods";

export const verMantenimiento = async (id, token) => {
    const endpoint = 'localhost:8080/mantenimiento/ver_mantenimientos/' + id;
    return await executeFetch(endpoint, null, HttpMethods.GET, token);
};