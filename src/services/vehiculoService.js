import { executeFetch } from "../connection/fetch";
import { HttpMethods } from "../connection/HttpMethods";

export const verVehiculos = async (token) => {
    const endpoint = 'http://localhost:8080/vehiculo/verAll';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

/*
public class RegistarVehiculoDTO {
    private Integer id;
    private String patente;
    private Integer antiguedad;
    private Integer kilometraje;
    private Integer litrosDeTanque;
    private String modelo;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate fechaRevision;
}
*/
export const registrar = async (data, token) => {
    const endpoint = 'http://localhost:8080/vehiculo/registrar';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};

export const inhabilitar = async (id, token) => {
    const endpoint = 'http://localhost:8080/vehiculo/inhabilitar/' + id;
    return await executeFetch(endpoint, null, HttpMethods.PATCH, token, 200);
};

export const habilitar = async (id, token) => {
    const endpoint = 'http://localhost:8080/vehiculo/habilitar/' + id;
    return await executeFetch(endpoint, null, HttpMethods.PATCH, token, 200);
};