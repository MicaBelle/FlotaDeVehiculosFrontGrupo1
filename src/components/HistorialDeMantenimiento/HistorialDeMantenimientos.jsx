import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

export const HistorialDeMantenimientos = () => {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  let list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setPage((prev) => prev + 1);
      }

     
      const mockData = [
        { patente: "ABC123",fecha: "2024-09-15", repuesto: "Filtro de aceite", realizadoPor: "Carlos Gómez" },
        { patente: "ABC123",fecha: "2024-08-10", repuesto: "Pastillas de freno", realizadoPor: "Ana Martínez" },
        {  patente: "ABC123",fecha: "2024-07-22", repuesto: "Correa de distribución", realizadoPor: "Juan Pérez" },
        { patente: "ABC123", fecha: "2024-06-30", repuesto: "Neumáticos", realizadoPor: "Lucía Fernández" },
        { patente: "ABC123", fecha: "2024-05-12", repuesto: "Batería", realizadoPor: "Pedro López" },
        { patente: "ABC123", fecha: "2024-04-25", repuesto: "Amortiguadores", realizadoPor: "Marta Sánchez" },
        { patente: "ABC123", fecha: "2024-03-14", repuesto: "Aceite del motor", realizadoPor: "Esteban Rodríguez" },
        { patente: "ABC123", fecha: "2024-02-18", repuesto: "Cables de bujía", realizadoPor: "Luis González" },
      ];

     
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsLoading(false);
      return {
        items: mockData,
        cursor: null, 
      };

      
      /*
      const res = await fetch('https://api.mantenimiento.com/historial', { signal });
      let json = await res.json();
      setIsLoading(false);
      return {
        items: json.data,
        cursor: json.nextCursor,
      };
      */
    },
  });

  return (
    <Table
      aria-label="Historial de Mantenimientos"
      isHeaderSticky
      classNames={{
        base: "max-h-[520px] overflow-scroll",
        table: "min-h-[420px]",
      }}
    >
      <TableHeader>
        <TableColumn key="patente">Patente</TableColumn>
        <TableColumn key="fecha">Fecha del Mantenimiento</TableColumn>
        <TableColumn key="repuesto">Repuesto Usado</TableColumn>
        <TableColumn key="realizadoPor">Realizado por</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={list.items}
        loadingContent={<Spinner label="Cargando historial..." />}
      >
        {(item) => (
          <TableRow key={item.fecha}>
            <TableCell>{item.patente}</TableCell>
            <TableCell>{item.fecha}</TableCell>
            <TableCell>{item.repuesto}</TableCell>
            <TableCell>{item.realizadoPor}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default HistorialDeMantenimientos;
