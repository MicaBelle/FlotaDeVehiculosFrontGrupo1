import React from 'react';
import { useSelector } from 'react-redux'; 
import TablaDeColectivos from '../TablaColectivos/TablaColectivos';
import { RegistroDeColectivo } from '../RegistroDeColectivo/RegistroDeColectivo';
import { HistorialDeMantenimientos } from '../HistorialDeMantenimiento/HistorialDeMantenimientos';
import RegistroControlesRutinarios from '../RegistroDeControlesRutinarios/RegistroDeControlesRutinarios';
import TablaDeInventario from '../RegistroItemInventario/TablaInventario';
import AsignarTareas from '../AsignarTareas/AsignarTareas';
import { TareasAsignadas } from '../TareasAsignadas/TareasAsignadas';



export const Principal = ({ activeMenu }) => {
  const userRole = useSelector((state) => state.user.role); 

  return (
    <div>
      {activeMenu === 'Registro' && userRole === 'ADMINISTRADOR' && <RegistroDeColectivo />} 
      {activeMenu === 'Inventario' && (userRole === 'ADMINISTRADOR' || userRole === 'SUPERVISOR' ) && <TablaDeInventario userRole={userRole} />} 
      {activeMenu === 'RegistroMantenimiento' && userRole === 'SUPERVISOR' && <RegistroControlesRutinarios />} 
      {activeMenu === 'Colectivos' && <TablaDeColectivos userRole={userRole} />} 
      {activeMenu === 'Mantenimientos' && <HistorialDeMantenimientos userRole={userRole} />} 
      {activeMenu === 'AsignarTarea' && userRole === 'OPERADOR' &&  <AsignarTareas/> } 
      {activeMenu === 'TareasAsignadas' && userRole === 'OPERADOR' &&  <TareasAsignadas/> } 
    </div>
  );
};

export default Principal;
