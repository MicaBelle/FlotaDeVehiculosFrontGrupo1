import { executeFetch } from "./fetch";
import { HttpMethods } from "./HttpMethods";

/*
public class RegistrarMantenimientoDTO {
    private String asunto;
    private Integer vehiculo_id;
}
*/
export const cargarMantenimientoManual = async (data, token) => {
    const endpoint = 'localhost:8080/mantenimiento/crearManual';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};

export const verMantenimientoPorVehiculo = async (id, token) => {
    const endpoint = 'localhost:8080/mantenimiento/porVehiculo/' + id;
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

export const verMantenimientos = async (token) => {
    const endpoint = 'localhost:8080/mantenimiento';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

export const verMantenimientosPendientes = async (token) => {
    const endpoint = 'localhost:8080/mantenimiento';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

/*
public class AsignarMantenimientoRequestDTO {
    private int operadorId;
}
*/
export const asignarMantenimiento = async (id, data, token) => {
    const endpoint = 'localhost:8080/mantenimiento/asignar/' + id;
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 200);
};

/*
public class FinalizarMantenimientoDTO {
    List<ItemUtilizadoRequestDTO> items;
}
public class ItemUtilizadoRequestDTO {
    Integer idItem;
    Integer cantidad;
}
*/
export const finalizarMantenimiento = async (id, data, token) => {
    const endpoint = 'localhost:8080/mantenimiento/finalizar/' + id;
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 200);
};