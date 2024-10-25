import React, { useEffect, useState, useMemo } from "react";
import { Input } from "@nextui-org/react";
import { useSelector } from "react-redux";
import TablaGenerica from "../TablaGenerica/TablaGenerica";
import { verProveedoresDeItems } from "../../services/proveedoresYPedidosController";

const columns = [
  { uid: "item", name: "NOMBRE DEL ITEM" },
  { uid: "proveedor", name: "NOMBRE DEL PROVEEDOR" },
  { uid: "emailProveedor", name: "EMAIL DEL PROVEEDOR" },
  { uid: "precio", name: "PRECIO" },
];

export function TablaDeProveedores() {
  const [filas, setFilas] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const proveedores = await verProveedoresDeItems(token);
        const mappedRows = proveedores.map((entry, index) => ({
          key: index.toString(),
          id: entry.item.id, 
          item: entry.item.nombre,
          proveedor: entry.proveedor.nombre, 
          emailProveedor: entry.proveedor.email, 
          precio: entry.precio, 
        }));
        setFilas(mappedRows);
      } catch (error) {
        console.error("Error al obtener los proveedores:", error);
      }
    };
    fetchProveedores();
  }, [token]);

  const filteredRows = useMemo(() => {
    return filas.filter((row) =>
      row.item.toLowerCase().includes(filterValue.toLowerCase()) ||
      row.proveedor.toLowerCase().includes(filterValue.toLowerCase()) ||
      row.emailProveedor.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filas, filterValue]);

  const renderCell = (item, columnKey) => {
    return item[columnKey];
  };

  const topContent = (
    <div className="flex justify-between items-center mb-4">
      <Input
        isClearable
        placeholder="Buscar por item, proveedor o email"
        value={filterValue}
        onClear={() => setFilterValue("")}
        onValueChange={setFilterValue}
      />
    </div>
  );

  return (
    <>
      <TablaGenerica
        data={filteredRows}
        columns={columns}
        renderCell={renderCell}
        topContent={topContent}
      />
    </>
  );
}

export default TablaDeProveedores;
