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
import TarjetaMantenimiento from "../TareasAsignadas/TajetaMantenimiento";


const columns = [
  { uid: "nombre", name: "NOMBRE" },
  { uid: "umbral", name: "UMBRAL" },
  { uid: "stock", name: "STOCK" },
  { uid: "cantCompraAutomatica", name: "CANT. COMPRA AUTOMÁTICA" },
  { uid: "acciones", name: "ACCIONES" }, 
];

export function TablaDeInventario({ userRole, onItemSeleccionado }) {
  const [filas, setFilas] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [showRegistro, setShowRegistro] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const token = useSelector((state) => state.user.token); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await obtenerItems(token);
        
        const mappedRows = items.map((item, index) => ({
          key: index.toString(),
          id: item.id, 
          nombre: item.nombre,
          umbral: item.umbral,
          stock: item.stock,
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
      {userRole === "ADMINISTRADOR" && (
        <Button color="primary" onClick={() => setShowRegistro(true)}>
          Agregar Item
        </Button>
      )}
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

  const handleUtilizarClick = (itemId, itemNombre) => {
    onItemSeleccionado(itemId, itemNombre);
  };

  const renderCell = (item, columnKey) => {
    if (columnKey === 'acciones' && userRole === "OPERADOR") {
      return (
        <Button onClick={() => handleUtilizarClick(item.id, item.nombre)} color="success">
          Utilizar
        </Button>
      );
    }
    return item[columnKey];
  };

  
  const filteredColumns =( userRole === "ADMINISTRADOR" || userRole === "SUPERVISOR" )
    ? columns.filter(col => col.uid !== "acciones") 
    : columns;

  return (
    <div>
      {showRegistro && userRole === "ADMINISTRADOR" ? (
        <RegistroItemInventario onSubmit={handleRegistroSubmit} onCancel={() => setShowRegistro(false)} />
      ) : (
        <Table aria-label="Tabla de Inventario" isHeaderSticky topContent={topContent}>
          <TableHeader columns={filteredColumns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "acciones" ? "center" : "start"}>
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
      {itemSeleccionado && ( 
        <TarjetaMantenimiento 
          itemId={itemSeleccionado} 
          onClose={() => setItemSeleccionado(null)} 
        />
      )}
    </div>
  );
}

export default TablaDeInventario;
