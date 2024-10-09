import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from "@nextui-org/react";
import { useSelector } from 'react-redux';
import mantenimientoImagen from '../../assets/Images/LogoNavBar.jpeg';
import { verMisMantenimientos, finalizarMantenimiento } from '../../services/mantenimientoService'; 
import TablaDeInventario from '../RegistroItemInventario/TablaInventario';


export const TareasAsignadas = () => {
  const [tareas, setTareas] = useState([]);
  const [showInventory, setShowInventory] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const token = useSelector((state) => state.user.token); 

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await verMisMantenimientos(token); 
        if (response && Array.isArray(response.mantenimientos)) {
          setTareas(response.mantenimientos);
        } else {
          console.error("La respuesta no contiene un array de mantenimientos:", response);
          setTareas([]); 
        }
      } catch (error) {
        console.error("Error al obtener las tareas: ", error);
      }
    };

    if (token) {
      fetchTareas(); 
    }
  }, [token]);

  const handleFinalizarTarea = (tareaId) => {
    setCurrentTaskId(tareaId); 
    setShowInventory(true); 
  };

  const handleConfirmarSeleccion = async (itemsSeleccionados) => {
    const fechaFinalizacion = new Date().toISOString(); 
    const data = {
      fechaFinalizacion,
      itemsSeleccionados, 
    };

    try {
      await finalizarMantenimiento(currentTaskId, data, token);
      alert("Tarea finalizada y los ítems han sido descontados del stock.");
      setTareas((prevTareas) => prevTareas.filter(tarea => tarea.id !== currentTaskId));
      setShowInventory(false); 
    } catch (error) {
      alert("Error al finalizar la tarea.");
    }
  };

  return (
    <div>
      {showInventory && (
        <TablaDeInventario 
          onConfirm={handleConfirmarSeleccion} 
          onCancel={() => setShowInventory(false)} 
        />
      )}
      {tareas.length === 0 ? (
        <p>No hay tareas asignadas</p>
      ) : (
        tareas.map((tarea) => (
          <Card className="max-w-[400px]" key={tarea.id}>
            <CardHeader className="flex gap-3">
              <Image
                alt="Imagen de la tarea"
                height={40}
                radius="sm"
                src={mantenimientoImagen}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md font-bold">{tarea.asunto}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Estado: {tarea.estadoMantenimiento}</p>
              <p>Operador: {tarea.operador.usuario}</p> 
              <p>Vehículo: {tarea.vehiculo.patente}</p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                color="secondary"
                onClick={() => handleFinalizarTarea(tarea.id)}
              >
                Finalizar Tarea
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}

export default TareasAsignadas;
