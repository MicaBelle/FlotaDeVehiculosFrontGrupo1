import React from 'react';
import { useSelector } from 'react-redux'; 
import TablaDeColectivos from '../TablaColectivos/TablaColectivos';
import { RegistroDeColectivo } from '../RegistroDeCoelctivo/RegistroDeColectivo';
import { HistorialDeMantenimientos } from '../HistorialDeMantenimiento/HistorialDeMantenimientos';
import RegistroControlesRutinarios from '../RegistroDeControlesRutinarios/RegistroDeControlesRutinarios';
import TablaDeInventario from '../RegistroItemInventario/TablaInventario';
import AsignarTareas from '../AsignarTareas/AsignarTareas';



export const Principal = ({ activeMenu }) => {
  const userRole = useSelector((state) => state.user.role); 

  return (
    <div>
      {activeMenu === 'Registro' && userRole === 'admin' && <RegistroDeColectivo />} 
      {activeMenu === 'Inventario' && userRole === 'admin' && <TablaDeInventario />} 
      {activeMenu === 'RegistroMantenimiento' && userRole === 'supervisor' && <RegistroControlesRutinarios />} 
      {activeMenu === 'Colectivos' && <TablaDeColectivos userRole={userRole} />} 
      {activeMenu === 'Mantenimientos' && <HistorialDeMantenimientos userRole={userRole} />} 
      {activeMenu === 'AsignarTarea' && userRole === 'operador' &&  <AsignarTareas/> } 
    </div>
  );
};

export default Principal;
