import React from 'react';
import { useSelector } from 'react-redux'; 
import TablaDeColectivos from '../TablaColectivos/TablaColectivos';
import { RegistroDeColectivo } from '../RegistroDeCoelctivo/RegistroDeColectivo';
import { HistorialDeMantenimientos } from '../HistorialDeMantenimiento/HistorialDeMantenimientos';
import RegistroControlesRutinarios from '../RegistroDeControlesRutinarios/RegistroDeControlesRutinarios';


export const Principal = ({ activeMenu }) => {
  const userRole = useSelector((state) => state.user.role); 

  return (
    <div>
      {activeMenu === 'Registro' && userRole === 'admin' && <RegistroDeColectivo />} 
      {activeMenu === 'RegistroMantenimiento' && userRole === 'supervisor' && <RegistroControlesRutinarios />} 
      {activeMenu === 'TareasAsignadas' && userRole === 'operador' &&  <h1>hola operador</h1> } 
      {activeMenu === 'Colectivos' && <TablaDeColectivos userRole={userRole} />} 
      {activeMenu === 'Mantenimientos' && <HistorialDeMantenimientos userRole={userRole} />} 
    </div>
  );
};

export default Principal;
