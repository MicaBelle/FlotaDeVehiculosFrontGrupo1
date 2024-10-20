import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { verMisMantenimientos } from '../../services/mantenimientoService';
import '../TareasAsignadas/styles/TareasAsignadas.css';
import TarjetaMantenimiento from './TajetaMantenimiento';
import Loader from '../Loader/Loader'; 

export const TareasAsignadas = () => {
  const [tareas, setTareas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [loadingTimeout, setLoadingTimeout] = useState(null); 
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
        setTareas([]);
      } finally {
        const timeoutId = setTimeout(() => {
          setIsLoading(false);
        }, 2000); 
        setLoadingTimeout(timeoutId);
      }
    };

    if (token) {
      fetchTareas(); 
    }

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [token]);

  const handleTareaFinalizada = (tareaId) => {
    setTareas((prevTareas) => prevTareas.filter(tarea => tarea.id !== tareaId));
  };

  return (
    <div>
      {isLoading ? ( 
        <>
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
          <div className="flex justify-center items-center h-full">
            <h2>Cargando tus tareas...</h2>
          </div>
        </>
      ) : (
        <div className="tarjeta-container">
          {tareas.length === 0 ? ( 
            <p>No hay tareas asignadas</p>
          ) : (
            tareas.map((tarea) => (
              <div className="tarjeta" key={tarea.id}>
                <TarjetaMantenimiento 
                  tarea={tarea} 
                  token={token} 
                  onTareaFinalizada={handleTareaFinalizada}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TareasAsignadas;
