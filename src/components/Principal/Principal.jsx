import React from 'react';
import { useSelector } from 'react-redux'; 
import TablaDeColectivos from '../TablaColectivos/TablaColectivos';
import { RegistroDeColectivo } from '../RegistroDeColectivo/RegistroDeColectivo';
import { HistorialDeMantenimientos } from '../HistorialDeMantenimiento/HistorialDeMantenimientos';
import TablaDeInventario from '../RegistroItemInventario/TablaInventario';
import AsignarTareas from '../AsignarTareas/AsignarTareas';
import { TareasAsignadas } from '../TareasAsignadas/TareasAsignadas';
import TablaDeChoferes from '../TablaChoferes/TablaDeChoferes';
import { MetricasGlobales } from '../MetricasGlobales/MetricasGlobales';



export const Principal = ({ activeMenu }) => {
  const userRole = useSelector((state) => state.user.role); 

  return (
    <div>
      {activeMenu === 'Registro' && userRole === 'ADMINISTRADOR' && <RegistroDeColectivo />} 
      {activeMenu === 'Inventario' && (userRole === 'ADMINISTRADOR' || userRole === 'SUPERVISOR' || userRole === 'OPERADOR' ) && <TablaDeInventario userRole={userRole} />}
      {activeMenu === 'Choferes' && userRole === 'ADMINISTRADOR' && <TablaDeChoferes/> }  
      {activeMenu === 'Colectivos' && <TablaDeColectivos userRole={userRole} />} 
      {activeMenu === 'Mantenimientos' && <HistorialDeMantenimientos userRole={userRole} />} 
      {activeMenu === 'AsignarTarea' && userRole === 'OPERADOR' &&  <AsignarTareas/> } 
      {activeMenu === 'TareasAsignadas' && userRole === 'OPERADOR' &&  <TareasAsignadas/> } 
      {activeMenu === 'Reportes' && userRole === 'GERENTE' &&  <MetricasGlobales/> } 
    </div>
  );
};

export default Principal;
