import { verVehiculos } from "../../services/vehiculoService";

export const fetchVehiculosDisponibles = async (setVehiculosDisponibles,token) => {
   console.log('entro')
    try {
        const response = await verVehiculos(token);
        if (response && response.vehiculos) {
            const vehiculosDisponibles = response.vehiculos.filter(item => 
                item.estadoDeHabilitacion === "HABILITADO" 
            ).map(item => ({
                id: item.id,
                patente: item.patente,
            }));
            
            setVehiculosDisponibles(vehiculosDisponibles); 
        }
    } catch (error) {
        console.error("Error fetching vehicles: ", error);
    }
};
export default fetchVehiculosDisponibles;
