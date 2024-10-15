import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import Loader from "../Loader/Loader";
import { Input, Button, Chip } from "@nextui-org/react";
import TablaGenerica from "../TablaGenerica/TablaGenerica";
import { RegistrarNuevoChofer } from "./RegistrarNuevoChofer";
import { verChoferes } from "../../services/choferesService";

const columns = [
    { uid: "nombre", name: "NOMBRE" },
    { uid: "vehiculoAsociado", name: "VEHICULO ASOCIADO" },
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await verChoferes(token);
                if (response && response.choferes) {
                    const mappedRows = response.choferes.map((item, index) => ({
                        key: index.toString(),
                        id: item.id,
                        nombre: item.nombre,
                        vehiculoAsociado: item.vehiculoAsociado,
                        estado: item.estado || "Desconocido",
                    }));
                    setFilas(mappedRows);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {

                const id = setTimeout(() => {
                    setLoading(false);
                }, 2000);
                setTimeoutId(id);
            }
        };

        fetchData();


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

    const handleRegistrarChofer = (id) => {
        setMostrarRegistroDeChofer(true);
    };

    const irAtras = () => {
        setMostrarRegistroDeChofer(false);
    };

    const filteredRows = useMemo(() => {
        return filas.filter((row) =>
            (filterStatus === "all" || row.estado === filterStatus) &&
            row.nombre.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [filas, filterValue, filterStatus]);

    const topContent = (
        <div className="flex justify-between items-end mb-4">
            <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Buscar por patente..."
                value={filterValue}
                onClear={() => setFilterValue("")}
                onValueChange={setFilterValue}
            />
            <Button color="primary" onClick={() => handleRegistrarChofer()}>
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
                    <div className="flex justify-end items-center gap-2">
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
                <RegistrarNuevoChofer irAtras={irAtras} />
            )}
        </div>
    );
}

export default TablaDeChoferes;
