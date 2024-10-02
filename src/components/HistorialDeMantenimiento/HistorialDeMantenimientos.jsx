import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const columns = [
  { uid: "patente", name: "Patente" },
  { uid: "fecha", name: "Fecha del Mantenimiento" },
  { uid: "repuesto", name: "Repuesto Usado" },
  { uid: "realizadoPor", name: "Realizado por" },
];

export function HistorialDeMantenimientos() {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState(""); 
  const [selectedRepuesto, setSelectedRepuesto] = useState("Todos"); 

  useEffect(() => {
    const mockData = [
      { patente: "ABC123", fecha: "2024-09-15", repuesto: "Filtro de aceite", realizadoPor: "Carlos Gómez" },
      { patente: "ABC123", fecha: "2024-08-10", repuesto: "Pastillas de freno", realizadoPor: "Ana Martínez" },
      { patente: "DEF456", fecha: "2024-07-22", repuesto: "Correa de distribución", realizadoPor: "Juan Pérez" },
      { patente: "ABC123", fecha: "2024-06-30", repuesto: "Neumáticos", realizadoPor: "Lucía Fernández" },
      { patente: "XYZ789", fecha: "2024-05-12", repuesto: "Batería", realizadoPor: "Pedro López" },
      { patente: "ABC123", fecha: "2024-04-25", repuesto: "Amortiguadores", realizadoPor: "Marta Sánchez" },
      { patente: "DEF456", fecha: "2024-03-14", repuesto: "Aceite del motor", realizadoPor: "Esteban Rodríguez" },
      { patente: "XYZ789", fecha: "2024-02-18", repuesto: "Cables de bujía", realizadoPor: "Luis González" },
    ];

    setTimeout(() => {
      setMantenimientos(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

 
  const filteredBySearch = mantenimientos.filter((item) =>
    item.realizadoPor.toLowerCase().includes(searchValue.toLowerCase())
  );

  
  const filteredMantenimientos = filteredBySearch.filter((item) =>
    selectedRepuesto === "Todos" ? true : item.repuesto === selectedRepuesto
  );

 
  const repuestoOptions = [
    "Todos",
    "Filtro de aceite",
    "Pastillas de freno",
    "Correa de distribución",
    "Neumáticos",
    "Batería",
    "Amortiguadores",
    "Aceite del motor",
    "Cables de bujía",
  ];

  const topContent = (
    <div className="flex justify-between items-end mb-4">
     
      <Input
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Buscar por quien lo realizó..."
        value={searchValue}
        onClear={() => setSearchValue("")}
        onValueChange={setSearchValue}
      />

      
      <Dropdown>
        <DropdownTrigger>
          <Button className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
            {selectedRepuesto}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="bg-gray-800 text-white"
          onAction={(key) => setSelectedRepuesto(key)}
        >
          {repuestoOptions.map((repuesto) => (
            <DropdownItem key={repuesto}>{repuesto}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );

  return (
    <div>
      {isLoading ? (
        <Spinner label="Cargando historial de mantenimientos..." />
      ) : (
        <Table
          aria-label="Historial de Mantenimientos"
          isHeaderSticky
          topContent={topContent}
          classNames={{
            base: "max-h-[520px] overflow-scroll",
            table: "min-h-[420px]",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent="No hay mantenimientos encontrados"
            items={filteredMantenimientos}
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
      )}
    </div>
  );
}

export default HistorialDeMantenimientos;

    
    /*
    const res = await fetch('https://api.mantenimiento.com/historial', { signal });
    let json = await res.json();
    setIsLoading(false);
    return {
      items: json.data,
      cursor: json.nextCursor,
    };
    */
  