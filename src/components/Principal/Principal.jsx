import React from 'react';
import { useSelector } from 'react-redux'; 
import TablaDeColectivos from '../TablaColectivos/TablaColectivos';
import { RegistroDeColectivo } from '../RegistroDeCoelctivo/RegistroDeColectivo';
import { HistorialDeMantenimientos } from '../HistorialDeMantenimiento/HistorialDeMantenimientos';


export const Principal = ({ activeMenu }) => {
  const userRole = useSelector((state) => state.user.role); 

  return (
    <div>
      {activeMenu === 'Registro' && userRole === 'admin' && <RegistroDeColectivo />} 
      {activeMenu === 'Colectivos' && <TablaDeColectivos userRole={userRole} />} 
      {activeMenu === 'Mantenimientos' && <HistorialDeMantenimientos userRole={userRole} />} 
    </div>
  );
};

export default Principal;
