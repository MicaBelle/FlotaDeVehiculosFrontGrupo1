import { backendUrl } from "../connection/backUrl";
import { executeFetch } from "../connection/fetch";
import { HttpMethods } from "../connection/HttpMethods";

/*
public class ItemDeInventarioDTO {
    private String nombre;
    private Integer umbral;
    private Integer stock;
    private Integer cantCompraAutomatica;
}
*/
export const registrarItem = async (data, token) => {
    const endpoint = backendUrl + '/inventario/registrarItem';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};
/*
{
    cantidadADisminuir: 1
}
*/
export const utilizarItem = async (id, data, token) => {
    const endpoint = backendUrl + '/inventario/utilizarItem/' + id;
    return await executeFetch(endpoint, data, HttpMethods.PATCH, token, 200);
};

export const obtenerItems = async (token) => {
    const endpoint = backendUrl + '/inventario/obtenerItems';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};