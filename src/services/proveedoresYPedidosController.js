import { backendUrl } from "../connection/backUrl";
import { executeFetch } from "../connection/fetch";
import { HttpMethods } from "../connection/HttpMethods";

/*
public class RegistroProveedorRequestDTO {
    String nombre;
    String email;
}
*/
export const registrarProveedor = async (data, token) => {
    const endpoint = backendUrl + '/pedido/registrarProveedor';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};

/* 
public class AsociacionProveedorDeITemDTO {
    Integer idItem;
    Integer idProveedor;
    Double precio;
}
*/
export const asociarProveedor = async (data, token) => {
    const endpoint = backendUrl + '/pedido/asociarProveedor';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};

/* 
public class AsociacionProveedorDeITemDTO {
    Integer idItem;
    Integer idProveedor;
    Double precio;
}
*/
export const obtenerGestorDePedido = async (token) => {
    const endpoint = backendUrl + '/pedido/obtenerGestorDePedido';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

/*
public class GestorDePedidosDTO {
    Double presupuesto;
    Integer cantDePedidoAutomatico;
}
*/
export const actualizarGestor = async (data, token) => {
    const endpoint = backendUrl + '/pedido/actualizarGestor';
    return await executeFetch(endpoint, data, HttpMethods.PATCH, token, 200);
};

export const verPedidos = async (token) => {
    const endpoint = backendUrl + '/pedido/verAll';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

/*
public class PedidoManualDTO {
    Integer cantidad;
    String motivo;
    Integer idItem;
    String estadoPedido;
}
*/
export const generarPedido = async (data, token) => {
    const endpoint = backendUrl + '/pedido/generarPedido';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};

