import React from 'react';
import { useSelector } from 'react-redux'; 
import TablaDeColectivos from '../TablaColectivos/TablaColectivos';
import { RegistroDeColectivo } from '../RegistroDeColectivo/RegistroDeColectivo';
import { HistorialDeMantenimientos } from '../HistorialDeMantenimiento/HistorialDeMantenimientos';
import TablaDeInventario from '../RegistroItemInventario/TablaInventario';
import AsignarTareas from '../AsignarTareas/AsignarTareas';
import { TareasAsignadas } from '../TareasAsignadas/TareasAsignadas';
import TablaDeChoferes from '../TablaChoferes/TablaDeChoferes';
import { MetricaBitacora } from '../../MetricasGlobales/MetricaBitacora/MetricaBitacora';
import { MetricaStock } from '../../MetricasGlobales/MetricaStock/MetricaStock';
import { MetricaFlota } from '../../MetricasGlobales/MetricaFlota/MetricaFlota';
import TablaPedidosRealizados from '../TablaPedidos/TablaPedidosRealizados';





export const Principal = ({ activeMenu }) => {
  const userRole = useSelector((state) => state.user.role); 

  return (
    <div>
      {activeMenu === 'Registro' && userRole === 'ADMINISTRADOR' && <RegistroDeColectivo />} 
      {activeMenu === 'Inventario' && (userRole === 'ADMINISTRADOR' || userRole === 'SUPERVISOR' || userRole === 'OPERADOR' ) && <TablaDeInventario userRole={userRole} />}
      {activeMenu === 'Choferes' && userRole === 'ADMINISTRADOR' && <TablaDeChoferes/> }  
      {activeMenu === 'Pedidos' && userRole === 'SUPERVISOR' && <TablaPedidosRealizados/> }  
      {activeMenu === 'Colectivos' && <TablaDeColectivos userRole={userRole} />} 
      {activeMenu === 'Mantenimientos' && <HistorialDeMantenimientos userRole={userRole} />} 
      {activeMenu === 'AsignarTarea' && userRole === 'OPERADOR' &&  <AsignarTareas/> } 
      {activeMenu === 'TareasAsignadas' && userRole === 'OPERADOR' &&  <TareasAsignadas/> } 
      {activeMenu === 'MetricaBitacora' && userRole === 'GERENTE' &&  <MetricaBitacora/> } 
      {activeMenu === 'MetricaStock' && userRole === 'GERENTE' && <MetricaStock/> } 
      {activeMenu === 'MetricaFlota' && userRole === 'GERENTE' && <MetricaFlota/> } 
    </div>
  );
};

export default Principal;
