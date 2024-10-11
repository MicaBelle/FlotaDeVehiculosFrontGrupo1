import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
} from "@nextui-org/react";
import { useSelector } from 'react-redux';
import { habilitar, inhabilitar, verVehiculos } from "../../services/vehiculoService";
import RegistrarMantenimiento from "../RegistroDeControlesRutinarios/RegistroDeControlesRutinarios";


const columns = [
  { uid: "patente", name: "PATENTE" },
  { uid: "antiguedad", name: "ANTIGÜEDAD" },
  { uid: "kilometraje", name: "KILOMETRAJE" },
  { uid: "litrosDeTanque", name: "LITROS DE TANQUE" },
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

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await verVehiculos(token);
        
        if (response && response.vehiculos) {
          const mappedRows = response.vehiculos.map((item, index) => ({
            key: index.toString(),
            id: item.id,
            patente: item.patente,
            antiguedad: item.antiguedad,
            kilometraje: item.kilometraje,
            litrosDeTanque: item.litrosDeTanque || 800,
            estado: item.estadoDeHabilitacion || "Desconocido",
            fechaDeRevision: item.fechaVencimiento ? new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item.fechaVencimiento)) : "Sin fecha",
          }));
          setFilas(mappedRows);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
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
          <div className="flex justify-end items-center gap-2">
            {userRole === "ADMINISTRADOR" && (
              <Button
                color={item.estado === "HABILITADO" ? "danger" : "success"}
                onClick={() => handleToggleEstado(item)}
              >
                {item.estado === "HABILITADO" ? "Inhabilitar" : "Habilitar"}
              </Button>
            )}
            {userRole === "SUPERVISOR" && (
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
      {!mostrarRegistroControles ? (
        <>
          <Table
            aria-label="Tabla de Colectivos"
            isHeaderSticky
            topContent={topContent}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No hay colectivos encontrados"} items={filteredRows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <RegistrarMantenimiento vehiculoId={vehiculoSeleccionado} irAtras={irAtras}/>
      )}
    </div>
  );
}

export default TablaDeColectivos;
