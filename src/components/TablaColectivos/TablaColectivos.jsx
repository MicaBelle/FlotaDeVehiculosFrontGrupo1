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
import { VerDetalleMantenimiento } from "../VerDetalleColectivo/VerDetalleMantenimiento";

const columns = [
  { uid: "patente", name: "PATENTE" },
  { uid: "chasis", name: "CHASIS" },
  { uid: "antiguedad", name: "ANTIGÜEDAD" },
  { uid: "kilometraje", name: "KILOMETRAJE" },
  { uid: "litrosTanque", name: "LITROS DE TANQUE" },
  { uid: "estado", name: "ESTADO" },
  { uid: "fechaDeRevison", name: "FECHA DE REVISION" },
  { uid: "actions", name: "ACCIONES" },
];

export function TablaDeColectivos({ userRole }) {
  const [filas, setFilas] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
  
    const mockData = [
      { patente: "ABC123", chasis: "XYZ456", antiguedad: 5, kilometraje: 150000, litrosTanque: 800, estado: "Inhabilitado", fechaDeRevison: "10/2/24" },
      { patente: "DEF456", chasis: "UVW789", antiguedad: 3, kilometraje: 80000, litrosTanque: 800, estado: "Habilitado", fechaDeRevison: "15/09/24" },
      { patente: "GHI789", chasis: "RST012", antiguedad: 8, kilometraje: 200000, litrosTanque: 800, estado: "Habilitado", fechaDeRevison: "13/10/24" },
      { patente: "JKL012", chasis: "OPQ345", antiguedad: 2, kilometraje: 50000, litrosTanque: 800, estado: "Inhabilitado", fechaDeRevison: "18/01/24" },
    ];

    const mappedRows = mockData.map((item, index) => ({
      key: index.toString(),
      ...item,
    }));

    setFilas(mappedRows);
  }, []);


  const handleFilterByStatus = (status) => {
    setFilterStatus(status);
  };

  const handleToggleEstado = (item) => {
    const newState = item.estado === "Habilitado" ? "Inhabilitado" : "Habilitado";
    //llamada a la api con elestado
    
    setFilas((prevRows) =>
      prevRows.map((row) =>
        row.patente === item.patente ? { ...row, estado: newState } : row
      )
    );
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
        <Button onClick={() => handleFilterByStatus("Habilitado")}>Habilitados</Button>
        <Button onClick={() => handleFilterByStatus("Inhabilitado")}>Inhabilitados</Button>
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
            color={cellValue === "Habilitado" ? "success" : "danger"}
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
                color={item.estado === "Habilitado" ? "danger" : "success"}
                onClick={() => handleToggleEstado(item)}
              >
                {item.estado === "Habilitado" ? "Inhabilitar" : "Habilitar"}
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
    </div>
  );
}

export default TablaDeColectivos;

/* useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axios.get("/api/colectivos");
       const data = response.data;

       const mappedRows = data.map((item, index) => ({
         key: index.toString(),
         patente: item.patente,
         chasis: item.chasis,
         antiguedad: item.antiguedad,
         kilometraje: item.kilometraje,
         litrosTanque: item.litrosTanque || 800,
         estado: item.estado || "Desconocido",
         chofer: item.chofer || "Sin asignar",
         //iria la fecha de revision
       }));

       setFilas(mappedRows);
     } catch (error) {
       console.error("Error fetching data: ", error);
     }
   };

   fetchData();
 }, []);*/
