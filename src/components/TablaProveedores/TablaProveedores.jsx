import React, { useEffect, useState, useMemo } from "react";
import { Input } from "@nextui-org/react";
import { useSelector } from "react-redux";
import TablaGenerica from "../TablaGenerica/TablaGenerica";
import { verProveedores } from "../../services/proveedoresYPedidosController";

const columns = [
  { uid: "nombre", name: "NOMBRE" },
  { uid: "email", name: "EMAIL" },
];

export function TablaDeProveedores() {
  const [filas, setFilas] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const proveedores = await verProveedores(token);
        const mappedRows = proveedores.map((proveedor, index) => ({
          key: index.toString(),
          id: proveedor.id,
          nombre: proveedor.nombre,
          email: proveedor.email,
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
      row.nombre.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filas, filterValue]);

  const renderCell = (item, columnKey) => {
    return item[columnKey];
  };

  const topContent = (
    <div className="flex justify-between items-center mb-4">
      <Input
        isClearable
        placeholder="Buscar por nombre"
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
