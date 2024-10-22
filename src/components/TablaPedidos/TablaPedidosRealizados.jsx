import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import { verPedidos } from "../../services/proveedoresYPedidosController";
import Loader from "../Loader/Loader";
import { Input, Button, Chip } from "@nextui-org/react";
import TablaGenerica from "../TablaGenerica/TablaGenerica";

const columns = [
  { uid: "nombre", name: "NOMBRE" },
  { uid: "fecha", name: "FECHA" },
  { uid: "cantidad", name: "CANTIDAD" },
  { uid: "motivo", name: "MOTIVO" },
  { uid: "estado", name: "ESTADO" },
];

export function TablaPedidosRealizados() {
  const [filas, setFilas] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);

  const token = useSelector((state) => state.user.token);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await verPedidos(token);
      if (response) {
        const mappedRows = response.map((item, index) => {
          const formattedDate = item.fecha 
            ? new Date(item.fecha[0], item.fecha[1] - 1, item.fecha[2]).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
            : "Sin fecha";
            
          return {
            key: index.toString(),
            nombre: item.item,
            fecha: formattedDate,
            cantidad: item.cantidad,
            motivo: item.motivo,
            estado: item.estadoPedido,
          };
        });
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

  const filteredRows = useMemo(() => {
    return filas.filter((row) =>
      (filterStatus === "all" || row.estado === filterStatus) &&
      row.nombre.toLowerCase().includes(filterValue.toLowerCase())
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
      <div className="flex gap-2">
        <Button onClick={() => handleFilterByStatus("all")}>Todos</Button>
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
            color={cellValue === "PENDIENTE" ? "warning" : "success"}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
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
            <h2>Cargando pedidos...</h2>
          </div>
        </>
      ) : (
        <TablaGenerica
          data={filteredRows}
          columns={columns}
          renderCell={renderCell}
          topContent={topContent}
        />
      )}
    </div>
  );
}

export default TablaPedidosRealizados;
