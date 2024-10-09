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
} from "@nextui-org/react";
import { RegistroItemInventario } from "./RegistroItemInventario";
import { obtenerItems } from '../../services/inventarioService'; 
import { useSelector } from "react-redux";

const columns = [
  { uid: "nombre", name: "NOMBRE" },
  { uid: "stock", name: "STOCK" },
  { uid: "umbral", name: "UMBRAL" },
  { uid: "cantCompraAutomatica", name: "CANT. COMPRA AUTOMÁTICA" }, 
];

export function TablaDeInventario( {userRole} ) {
  const [filas, setFilas] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [showRegistro, setShowRegistro] = useState(false);
  const token = useSelector((state) => state.user.token); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await obtenerItems(token);
        
        const mappedRows = items.map((item, index) => ({
          key: index.toString(),
          nombre: item.nombre,
          stock: item.stock,
          umbral: item.umbral,
          cantCompraAutomatica: item.cantCompraAutomatica, 
        }));
        setFilas(mappedRows);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
      }
    };

    fetchItems();
  }, [token]); 

  const filteredRows = useMemo(() => {
    return filas.filter((row) =>
      row.nombre.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filas, filterValue]);

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
      <Button color="primary" onClick={() => setShowRegistro(true)}>
        Agregar Item
      </Button>
    </div>
  );

  const handleRegistroSubmit = (nuevoItem) => {
    setFilas((prevFilas) => [
      ...prevFilas,
      {
        key: (prevFilas.length + 1).toString(),
        ...nuevoItem,
      },
    ]);
    setShowRegistro(false);
  };

  const renderCell = (item, columnKey) => {
    return item[columnKey];
  };

  return (
    <div>
      {showRegistro ? (
        <RegistroItemInventario onSubmit={handleRegistroSubmit} onCancel={() => setShowRegistro(false)} />
      ) : (
        <Table aria-label="Tabla de Inventario" isHeaderSticky topContent={topContent}>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No hay artículos encontrados"} items={filteredRows}>
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

export default TablaDeInventario;
