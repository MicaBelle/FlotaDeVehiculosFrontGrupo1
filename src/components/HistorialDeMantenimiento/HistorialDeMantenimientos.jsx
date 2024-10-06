import React, { useEffect, useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button } from "@nextui-org/react";
import VerDetalleMantenimiento from "../VerDetalleColectivo/VerDetalleMantenimiento";
import { verMantenimientos } from "../../services/mantenimientoService"; 
import { useSelector } from "react-redux";

const columns = [
  { uid: "patente", name: "PATENTE" },
  { uid: "fecha", name: "FECHA DEL MANTENIMIENTO" },
  { uid: "repuesto", name: "REPUESTO USADO" },
  { uid: "realizadoPor", name: "REALIZADO POR" },
  { uid: "actions", name: "ACCIONES" },
];

export function HistorialDeMantenimientos() {
  const [mantenimientos, setMantenimientos] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);
  const token = useSelector((state) => state.user.token); 

  useEffect(() => {
    const cargarMantenimientos = async () => {
      try {
        const response = await verMantenimientos(token);
        
      
        if (response && Array.isArray(response.mantenimientos)) {
          const mappedRows = response.mantenimientos.map((item, index) => ({
            key: index.toString(),
            patente: item.vehiculo.patente,
            fecha: item.fechaInicio,
            repuesto: item.itemUtilizado.map((utilizado) => utilizado.item).join(", "),
            realizadoPor: item.operador.usuario,
            idVehiculo: item.vehiculo.id,
          }));
          setMantenimientos(mappedRows); 
        } else {
          setMantenimientos([]); 
        }
      } catch (error) {
        console.error("Error al cargar los mantenimientos:", error);
        setMantenimientos([]);
      } finally {
        setIsLoading(false);
      }
    };

    cargarMantenimientos();
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
          <div>
            <Button
              color="primary"
              variant="shadow"
              onClick={() => handleVerDetalle(item)}
            >
              Ver Detalle
            </Button>
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
          idVehiculo={selectedMantenimiento.idVehiculo} 
          token={token} 
          irAtras={handleIrAtras}
        />
      ) : (
        <Table
          aria-label="Historial de Mantenimientos"
          isHeaderSticky
          topContent={topContent}
          isLoading={isLoading} 
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"No hay mantenimientos encontrados"}
            items={filteredMantenimientos}
          >
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default HistorialDeMantenimientos;