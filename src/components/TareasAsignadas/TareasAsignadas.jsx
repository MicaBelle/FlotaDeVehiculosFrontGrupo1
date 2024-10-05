import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from "@nextui-org/react";
import mantenimientoImagen from '../../assets/Images/LogoNavBar.jpeg';

export const TareasAsignadas = () => {

  const tarea = {
    nombre: "Revisión de Filtros",
    descripcion: "Revisar y reemplazar los filtros de aire y aceite del vehículo.",
  };
  const handleFinalizarTarea =()=>{
    console.log('llamda a la api para descontar un item del stock')
  }


  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="Imagen de la tarea"
          height={40}
          radius="sm"
          src={mantenimientoImagen}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md font-bold">{tarea.nombre}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{tarea.descripcion}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button color="secondary" onClick={ handleFinalizarTarea } >Finalizar Tarea</Button>
      </CardFooter>
    </Card>
  );
}

export default TareasAsignadas;
/*
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button, Input } from "@nextui-org/react";
import { useSelector } from 'react-redux';
import mantenimientoImagen from '../../assets/Images/LogoNavBar.jpeg';
//import axios from 'axios';

export const TareasAsignadas = () => {
  const [tareas, setTareas] = useState([]);
  const [itemUsado, setItemUsado] = useState('');

  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await axios.get(`/api/tareas?username=${username}`);
        setTareas(response.data);
      } catch (error) {
        console.error("Error al obtener las tareas: ", error);
      }
    };
    
    if (username) {
      fetchTareas();
    }
  }, [username]);

  const handleFinalizarTarea = async (tareaId) => {
    try {
      if (!itemUsado) {
        alert("Por favor, ingrese un ítem para descontar del stock");
        return;
      }
      await axios.post(`/api/tareas/${tareaId}/finalizar`, { itemUsado });

      console.log('Tarea finalizada y item descontado del stock');
      alert("Tarea finalizada y el ítem ha sido descontado del stock.");
    } catch (error) {
      console.error("Error al finalizar la tarea: ", error);
      alert("Error al finalizar la tarea.");
    }
  };

  return (
    <div>
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
                <p className="text-md font-bold">{tarea.nombre}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>{tarea.descripcion}</p>
              <Input
                fullWidth
                placeholder="Ingrese el ítem usado para descontar"
                value={itemUsado}
                onChange={(e) => setItemUsado(e.target.value)}
              />
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

export default TareasAsignadas;*/
