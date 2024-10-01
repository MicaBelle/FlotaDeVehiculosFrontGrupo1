import { executeFetch } from "./fetch";
import { HttpMethods } from "./HttpMethods";

/*
public class RegistarVehiculoDTO {
    private Integer id;
    private String patente;
    private Integer antiguedad;
    private Integer kilometraje;
    private Integer litrosDeTanque;
    private String modelo;
    private Integer choferId;
}
*/
export const registrar = async (data, token) => {
    const endpoint = 'localhost:8080/vehiculo/registrar';
    return await executeFetch(endpoint, data, HttpMethods.POST, token);
};

export const inhabilitar = async (id, token) => {
    const endpoint = 'localhost:8080/vehiculo/inhabilitar/' + id;
    return await executeFetch(endpoint, null, HttpMethods.PATCH, token);
};

export const habilitar = async (id, token) => {
    const endpoint = 'localhost:8080/vehiculo/habilitar/' + id;
    return await executeFetch(endpoint, null, HttpMethods.PATCH, token);
};