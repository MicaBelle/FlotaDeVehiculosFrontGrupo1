import React from 'react';
import { useSelector } from 'react-redux'; 
import TablaDeColectivos from './tablaColectivos';
import { RegistroDeColectivo } from './RegistroDeColectivo';

export const Principal = ({ activeMenu }) => {
  const userRole = useSelector((state) => state.user.role); 

  return (
    <div>
      {activeMenu === 'Registro' && userRole === 'admin' && <RegistroDeColectivo />} 
      {activeMenu === 'Colectivos' && <TablaDeColectivos userRole={userRole} />} 
    </div>
  );
};

export default Principal;
