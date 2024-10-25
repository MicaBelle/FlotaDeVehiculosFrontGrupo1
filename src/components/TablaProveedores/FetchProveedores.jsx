import { verProveedores } from "../../services/proveedoresYPedidosController";

export const fetchProveedores = async (setProveedores, token) => {
    try {
        const response = await verProveedores(token);
        if (response) {
            const proveedoresDisponibles = response.map(index => ({
                id: index.proveedor.id, 
                nombre: index.proveedor.nombre,
                email: index.proveedor.email,
                item: index.item.nombre, 
                precio: index.precio,
            }));

            setProveedores(proveedoresDisponibles);
        }
    } catch (error) {
        console.error("Error fetching proveedores: ", error);
    }
};

export default fetchProveedores;
