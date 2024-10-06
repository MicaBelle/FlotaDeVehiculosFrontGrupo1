import { backendUrl } from "../connection/backUrl";
import { executeFetch } from "../connection/fetch";
import { HttpMethods } from "../connection/HttpMethods";

/*
public class RegistrarItemDeInventarioDTO {
    private String nombre;
    private Integer umbral;
    private Integer stock;
}
*/
export const registrarItem = async (data, token) => {
    const endpoint = backendUrl + '/inventario/registrarItem';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};

export const utilizarItem = async (id, token) => {
    const endpoint = backendUrl + '/inventario/utilizarItem/' + id;
    return await executeFetch(endpoint, null, HttpMethods.PATCH, token, 200);
};