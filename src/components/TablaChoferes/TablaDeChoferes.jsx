import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import Loader from "../Loader/Loader";
import { Input, Button, Chip } from "@nextui-org/react";
import TablaGenerica from "../TablaGenerica/TablaGenerica";
import { RegistrarNuevoChofer } from "./RegistrarNuevoChofer";
import { verChoferes, habilitarChofer, inhabilitarChofer } from "../../services/choferesService"; 

const columns = [
    { uid: "nombre", name: "NOMBRE" },
    { uid: "vehiculoAsociado", name: "VEHÍCULO ASOCIADO" },
    { uid: "estado", name: "ESTADO" },
    { uid: "actions", name: "ACCIONES" },
];

export function TablaDeChoferes() {
    const [filas, setFilas] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [mostrarRegistroDeChofer, setMostrarRegistroDeChofer] = useState(false);
    const [loading, setLoading] = useState(true);
    const [timeoutId, setTimeoutId] = useState(null);

    const token = useSelector((state) => state.user.token);

    const fetchChoferes = async () => {
        setLoading(true);
        try {
            const response = await verChoferes(token);
            if (response) {
                const mappedRows = response.map((item, index) => ({
                    key: index.toString(),
                    id: item.idChofer, 
                    nombre: item.nombre, 
                    vehiculoAsociado: item.idVehiculo ? `Vehículo ${item.idVehiculo}` : "No asignado", 
                    estado: item.estadoChofer || "Desconocido", 
                }));

                setFilas(mappedRows); 
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            const id = setTimeout(() => {
                setLoading(false);
            }, 1000);
            setTimeoutId(id);
        }
    };

    useEffect(() => {
        fetchChoferes();
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [token]); 

    const handleFilterByStatus = (status) => {
        setFilterStatus(status); 
    };

    const handleToggleEstado = async (item) => {
        const newState = item.estado === "HABILITADO" ? "INHABILITADO" : "HABILITADO";
        const id = item.id;
    
        try {
          if (newState === "HABILITADO") {
            await habilitarChofer(id, token);
          } else {
            await inhabilitarChofer(id, token);
          }
    
          setFilas((prevRows) =>
            prevRows.map((row) =>
              row.id === id ? { ...row, estado: newState } : row
            )
          );
        } catch (error) {
          alert("Error al cambiar el estado del chofer. Por favor, intente nuevamente.");
        }
    };

    const handleRegistrarChofer = async (nuevoChofer) => {
        setMostrarRegistroDeChofer(false);
        await fetchChoferes();  
    };

    const filteredRows = useMemo(() => {
        return filas.filter((row) =>
            (filterStatus === "all" || row.estado === filterStatus) &&
            row.nombre?.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [filas, filterValue, filterStatus]);

    const topContent = (
        <div className="flex justify-between items-end mb-4">
            <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Buscar por nombre..."
                value={filterValue}
                onClear={() => setFilterValue("")}
                onValueChange={setFilterValue}
            />
            <Button onClick={() => setMostrarRegistroDeChofer(true)} color="primary">
                Registrar chofer
            </Button>
            <div className="flex gap-2">
                <Button onClick={() => handleFilterByStatus("all")}>Todos</Button>
                <Button onClick={() => handleFilterByStatus("HABILITADO")}>Habilitados</Button>
                <Button onClick={() => handleFilterByStatus("INHABILITADO")}>Inhabilitados</Button>
            </div>
        </div>
    );

    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "estado":
                return (
                    <Chip
                        className="capitalize"
                        color={cellValue === "HABILITADO" ? "success" : "danger"}
                        size="sm"
                        variant="flat"
                    >
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div>
                        <Button
                            color={item.estado === "HABILITADO" ? "danger" : "success"}
                            onClick={() => handleToggleEstado(item)}
                        >
                            {item.estado === "HABILITADO" ? "Inhabilitar" : "Habilitar"}
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    };

    return (
        <div>
            {loading ? (
                <>
                    <div className="flex justify-center items-center h-full">
                        <Loader />
                    </div>
                    <div className="flex justify-center items-center h-full">
                        <h2>Cargando choferes...</h2>
                    </div>
                </>
            ) : !mostrarRegistroDeChofer ? (
                <TablaGenerica
                    data={filteredRows}
                    columns={columns}
                    renderCell={renderCell}
                    topContent={topContent}
                />
            ) : (
                <RegistrarNuevoChofer onSubmit={handleRegistrarChofer} onCancel={() => setMostrarRegistroDeChofer(false)} />
            )}
        </div>
    );
}

export default TablaDeChoferes;