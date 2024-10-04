import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
} from "@nextui-org/react";

const columns = [
  { uid: "patente", name: "Patente" },
  { uid: "asunto", name: "Asunto" },
  { uid: "actions", name: "Acciones" },
];

export function AsignarMantenimiento() {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);

  useEffect(() => {
    const mockData = [
      {
        patente: "ABC123",
        asunto: "Cambio de filtro",
      },
      {
        patente: "XYZ789",
        asunto: "Reemplazo de batería",
      },
      {
        patente: "DEF456",
        asunto: "Cambio de aceite",
      },
    ];

    setTimeout(() => {
      setMantenimientos(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAsignarMantenimiento = (mantenimiento) => {
    setSelectedMantenimiento(mantenimiento);
    console.log(`Asignando mantenimiento de patente ${mantenimiento.patente}`);
  };

  return (
    <div>
      {isLoading ? (
        <p>Cargando mantenimientos...</p>
      ) : (
        <Table aria-label="Mantenimientos Pendientes">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={mantenimientos}>
            {(item) => (
              <TableRow key={item.patente}>
                <TableCell>{item.patente}</TableCell>
                <TableCell>{item.asunto}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleAsignarMantenimiento(item)}
                  >
                    Asignarme
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AsignarMantenimiento;




/*useEffect(() => {

    const fetchMantenimientosPendientes = async () => {
      try {
        const response = await fetch('/api/mantenimientos/pendientes');
        const data = await response.json();
        setMantenimientos(data);
      } catch (error) {
        console.error("Error fetching mantenimientos:", error);
      }
    };
    fetchMantenimientosPendientes();
  }, []);

  const handleAsignar = (mantenimiento) => {
    setSelectedMantenimiento(mantenimiento);
  };

  const handleGuardarAsignacion = async () => {
    if (selectedMantenimiento && fechaInicio && asunto) {
      const asignacion = {
        idMantenimiento: selectedMantenimiento.id, 
        fechaInicio,
        asunto,
        estado: "Aprobado"
      };

      try {
        setIsLoading(true);
        const response = await fetch(`/api/mantenimientos/asignar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(asignacion)
        });

        if (response.ok) {
          // Actualizar el estado local si la API responde correctamente
          const updatedMantenimientos = mantenimientos.map((mantenimiento) =>
            mantenimiento.id === selectedMantenimiento.id
              ? { ...mantenimiento, estado: "Aprobado", fechaInicio, asunto }
              : mantenimiento
          );
          setMantenimientos(updatedMantenimientos);
          setSelectedMantenimiento(null);
          setFechaInicio("");
          setAsunto("");
        } else {
          console.error("Error al asignar el mantenimiento");
        }
      } catch (error) {
        console.error("Error en la llamada a la API:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };*/
