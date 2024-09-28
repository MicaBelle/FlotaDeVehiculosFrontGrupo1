import React from 'react';
import { useSelector } from 'react-redux'; 
import TablaDeColectivos from './tablaColectivos';

export const Principal = ({ activeMenu }) => {
  const userRole = useSelector((state) => state.user.role); 

  return (
    <div>
      {activeMenu === 'Colectivos' && <TablaDeColectivos userRole={userRole} />} 
      {activeMenu === 'Profile' && <h2>Aquí está tu Perfil</h2>}
      {activeMenu === 'Settings' && <h2>Ajustes</h2>}
    </div>
  );
};

export default Principal;
