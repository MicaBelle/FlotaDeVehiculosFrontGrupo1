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
import VerDetalleMantenimiento from "../VerDetalleColectivo/VerDetalleMantenimiento";


const columns = [
  { uid: "patente", name: "PATENTE" },
  { uid: "fecha", name: "FECHA DEL MANTENIMIENTO" },
  { uid: "repuesto", name: "REPUSETO USADO" },
  { uid: "realizadoPor", name: "REALIZADO POR" },
  { uid: "actions", name: "ACCIONES" },
];

export function HistorialDeMantenimientos() {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);

  useEffect(() => {
    const mockData = [
      { patente: "ABC123", fecha: "2024-09-15", repuesto: "Filtro de aceite", realizadoPor: "Carlos Gómez" },
      { patente: "XYZ789", fecha: "2024-05-12", repuesto: "Batería", realizadoPor: "Pedro López" },
      { patente: "DEF456", fecha: "2024-03-14", repuesto: "Aceite del motor", realizadoPor: "Esteban Rodríguez" },
      { patente: "DEZ456", fecha: "2024-03-14", repuesto: "Aceite del motor", realizadoPor: "Esteban Rodríguez" },
    ];

    const mappedRows = mockData.map((item, index) => ({
      key: index.toString(),
      ...item,
    }));

    setMantenimientos(mappedRows);
    setIsLoading(false);
  }, []);

  const handleVerDetalle = (mantenimiento) => {
    setSelectedMantenimiento(mantenimiento);
  };

  const handleIrAtras = () => {
    setSelectedMantenimiento(null);
  };

  const filteredMantenimientos = useMemo(() => {
    return mantenimientos.filter((mantenimiento) =>
      mantenimiento.realizadoPor.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [mantenimientos, filterValue]);

  const topContent = (
    <div className="flex justify-between items-end mb-4">
      <Input
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Buscar por quien lo realizó..."
        value={filterValue}
        onClear={() => setFilterValue("")}
        onValueChange={setFilterValue}
      />
    </div>
  );

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div >
            <Button color="primary" variant="shadow" onClick={() => handleVerDetalle(item)}>Ver Detalle</Button>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div>
      {selectedMantenimiento ? (
        <VerDetalleMantenimiento
          mantenimiento={selectedMantenimiento}
          irAtras={handleIrAtras}
        />
      ) : (
        <Table
          aria-label="Historial de Mantenimientos"
          isHeaderSticky
          topContent={topContent}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No hay mantenimientos encontrados"} items={filteredMantenimientos}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default HistorialDeMantenimientos;
