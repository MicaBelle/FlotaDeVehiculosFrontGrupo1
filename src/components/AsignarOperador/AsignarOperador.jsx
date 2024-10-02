import React, { useEffect, useState } from "react";
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";

export function AsignarOperador({ colectivo, onClose }) {
  const [operadores, setOperadores] = useState([]);
  const [selectedOperador, setSelectedOperador] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOperadores = async () => {
      /* const response = await fetch('/api/operadores');
       const data = await response.json();
       setOperadores(data);*/

    
      const mockData = [
        { id: 1, nombre: "Juan Pérez", dni: "12345678", estado: "Disponible" },
        { id: 2, nombre: "Ana Gómez", dni: "87654321", estado: "Asignado" },
        { id: 3, nombre: "Carlos Martínez", dni: "11223344", estado: "Disponible" },
        { id: 4, nombre: "Lucía Fernández", dni: "55667788", estado: "Asignado" },
      ];
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOperadores(mockData);
      setIsLoading(false);
    };

    fetchOperadores();
  }, []);

  const handleAsignar = () => {
    if (selectedOperador) {
      alert(`Operador ${selectedOperador.nombre} asignado al colectivo: ${colectivo.patente}`);
      onClose(); 
    } else {
      alert("Por favor, selecciona un operador.");
    }
  };

  return (
    <div>
      <h2>Asignar Operador a {colectivo.patente}</h2>
      <Table
        aria-label="Tabla de Operadores"
        isHeaderSticky
        css={{ height: "auto", minWidth: "100%" }}
      >
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>DNI</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoading} loadingContent="Cargando operadores...">
          {operadores.map((operador) => (
            <TableRow key={operador.id}>
              <TableCell>{operador.nombre}</TableCell>
              <TableCell>{operador.dni}</TableCell>
              <TableCell>
                <Chip color={operador.estado === "Disponible" ? "success" : "warning"} size="sm" variant="flat">
                  {operador.estado}
                </Chip>
              </TableCell>
              <TableCell>
                <Button 
                  disabled={operador.estado === "Asignado"}
                  onClick={() => setSelectedOperador(operador)}
                >
                  Seleccionar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
        <Button onClick={handleAsignar} color="primary">Asignar</Button>
        <Button color="default" onClick={onClose}>Cancelar</Button>
      </div>
    </div>
  );
}
