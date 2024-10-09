import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { verMisMantenimientos } from '../../services/mantenimientoService';

import '../TareasAsignadas/styles/TareasAsignadas.css'
import TarjetaMantenimiento from './TajetaMantenimiento';

export const TareasAsignadas = () => {
  const [tareas, setTareas] = useState([]);
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

  const handleTareaFinalizada = (tareaId) => {
    setTareas((prevTareas) => prevTareas.filter(tarea => tarea.id !== tareaId));
  };

  return (
    <div className="tarjeta-container">
      {tareas.length === 0 ? (
        <p>No hay tareas asignadas</p>
      ) : (
        tareas.map((tarea) => (
          <div className="tarjeta" key={tarea.id}>
          <TarjetaMantenimiento 
            key={tarea.id} 
            tarea={tarea} 
            token={token} 
            onTareaFinalizada={handleTareaFinalizada}
          />
        </div>
        ))
      )}
    </div>
  );
}

export default TareasAsignadas;
