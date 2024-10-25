import React, { useState, useEffect, useMemo, cloneElement } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Input, Button, Chip } from "@nextui-org/react";
import TablaGenerica from "../TablaGenerica/TablaGenerica";
import { RegistrarNuevoChofer } from "./RegistrarNuevoChofer";
import { verChoferes, habilitarChofer, inhabilitarChofer, asignarChofer } from "../../services/choferesService";
import fetchVehiculosDisponibles from "./FetchVehiculosDisponible";

const columns = [
  { uid: "nombre", name: "NOMBRE" },
  { uid: "vehiculoAsociado", name: "VEHÍCULO ASOCIADO" },
  { uid: "estado", name: "ESTADO" },
  { uid: "actions", name: "ACCIONES" },
];

export function TablaDeChoferes() {
  const [filas, setFilas] = useState([]);
  const [vehiculosDisponibles, setVehiculosDisponibles] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState('');
  const [choferIdSeleccionado, setChoferIdSeleccionado] = useState(null);
  const [mostrarVehiuclosDisponibles, setMostrarVehiuclosDisponibles] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [mostrarRegistroDeChofer, setMostrarRegistroDeChofer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);
  const { role } = useSelector((state) => state.user);

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
          vehiculoAsociado: item.patente ? item.patente : 'Sin vehiculo asociado',
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
  

  const asignarVehiculo = async (idChofer) => {
    setChoferIdSeleccionado(idChofer);
    setMostrarVehiuclosDisponibles(true);
    await fetchVehiculosDisponibles(setVehiculosDisponibles, token);
  };

  const handleAsignarVehiculo = async () => {
    if (vehiculoSeleccionado && choferIdSeleccionado) {
      const data = {
        idVehiculo: vehiculoSeleccionado,
        idChofer: choferIdSeleccionado,
      };
      try {
        await asignarChofer(data, token);
        setMostrarVehiuclosDisponibles(false);
        setVehiculoSeleccionado('');
        await fetchChoferes();
      } catch (error) {
        console.error("Error al asignar el vehículo: ", error);
      }
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

  const handleRegistrarChofer = async () => {
    setMostrarRegistroDeChofer(false);
    await fetchChoferes();
  };

  const filteredRows = useMemo(() => {
    return filas.filter(
      (row) =>
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
      {role==="ADMINISTRADOR" && 
      <Button onClick={() => setMostrarRegistroDeChofer(true)} color="primary">
        Registrar chofer
      </Button>}
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
           {
            
          role === "ADMINISTRADOR" &&
          <Button
              color={item.estado === "HABILITADO" ? "danger" : "success"}
              onClick={() => handleToggleEstado(item)}
            >
              {item.estado === "HABILITADO" ? "Inhabilitar" : "Habilitar"}
            </Button>
           } 
            
            { item.estado === "HABILITADO" && role === "SUPERVISOR" &&
               <Button color="warning" onClick={() => asignarVehiculo(item.id)}>
               Asignar Vehículo
             </Button>
            }
           
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
        <>
          <TablaGenerica data={filteredRows} columns={columns} renderCell={renderCell} topContent={topContent} />

          {mostrarVehiuclosDisponibles && (
            <div>
              <select
                value={vehiculoSeleccionado}
                onChange={(e) => setVehiculoSeleccionado(e.target.value)}
              >
                <option value="">Seleccionar vehículo</option>
                {vehiculosDisponibles.map((vehiculo) => (
                  <option key={vehiculo.id} value={vehiculo.id}>
                    {vehiculo.patente}
                  </option>
                ))}
              </select>
              <Button onClick={handleAsignarVehiculo} color="primary">
                Asignar Vehículo
              </Button>
            </div>
          )}
        </>
      ) : (
        <RegistrarNuevoChofer onSubmit={handleRegistrarChofer} onCancel={() => setMostrarRegistroDeChofer(false)} />
      )}
    </div>
  );
}

export default TablaDeChoferes;
