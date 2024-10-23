import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import { habilitar, inhabilitar, verVehiculos } from "../../services/vehiculoService";
import RegistrarMantenimiento from "../RegistroDeControlesRutinarios/RegistroDeControlesRutinarios";
import Loader from "../Loader/Loader";
import { Input, Button, Chip } from "@nextui-org/react";
import TablaGenerica from "../TablaGenerica/TablaGenerica";

const columns = [
  { uid: "patente", name: "PATENTE" },
  { uid: "antiguedad", name: "ANTIGÜEDAD" },
  { uid: "kilometraje", name: "KILOMETRAJE" },
  { uid: "estado", name: "ESTADO" },
  { uid: "fechaDeRevision", name: "FECHA DE REVISION" },
  { uid: "actions", name: "ACCIONES" },
];

export function TablaDeColectivos({ userRole }) {
  const [filas, setFilas] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [mostrarRegistroControles, setMostrarRegistroControles] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);

  const token = useSelector((state) => state.user.token);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await verVehiculos(token);
      if (response && response.vehiculos) {
        const mappedRows = response.vehiculos.map((item, index) => ({
          key: index.toString(),
          id: item.id,
          patente: item.patente,
          antiguedad: item.antiguedad,
          kilometraje: item.kilometraje,
          estado: item.estadoDeHabilitacion || "Desconocido",
          fechaDeRevision: item.fechaVencimiento ? new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item.fechaVencimiento)) : "Sin fecha",
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

  useEffect(() => {
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
        await habilitar(id, token);
      } else {
        await inhabilitar(id, token);
      }

      setFilas((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, estado: newState } : row
        )
      );
    } catch (error) {
      alert("Error al cambiar el estado del vehículo. Por favor, intente nuevamente.");
    }
  };

  const handleRegistrarMantenimiento = (id) => {
    setVehiculoSeleccionado(id);
    setMostrarRegistroControles(true);
  };

  const irAtras = () => {
    setMostrarRegistroControles(false);
    fetchData(); 
  };

  const filteredRows = useMemo(() => {
    return filas.filter((row) =>
      (filterStatus === "all" || row.estado === filterStatus) &&
      row.patente.toLowerCase().includes(filterValue.toLowerCase())
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
            {userRole === "ADMINISTRADOR" && (
              <Button
                color={item.estado === "HABILITADO" ? "danger" : "success"}
                onClick={() => handleToggleEstado(item)}
              >
                {item.estado === "HABILITADO" ? "Inhabilitar" : "Habilitar"}
              </Button>
            )}
            {userRole === "SUPERVISOR" && item.estado === "HABILITADO" && (
              <Button color="danger" onClick={() => handleRegistrarMantenimiento(item.id)}>
                Registrar mantenimiento
              </Button>
            )}
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
            <h2>Cargando colectivos...</h2>
          </div>
        </>
      ) : !mostrarRegistroControles ? (
        <TablaGenerica
          data={filteredRows}
          columns={columns}
          renderCell={renderCell}
          topContent={topContent}
        />
      ) : (
        <RegistrarMantenimiento vehiculoId={vehiculoSeleccionado} irAtras={irAtras} />
      )}
    </div>
  );
}

export default TablaDeColectivos;
