import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Principal from '../../components/Principal/Principal';
import NavBar from '../../components/NavBar/NavBar';
import '../Home/Styles/home.css';

export const Home = () => {
  const userRole = useSelector((state) => state.user.role);


  const getDefaultMenu = (role) => {
    switch (role) {
      case 'ADMINISTRADOR':
        return 'Colectivos'; 
      case 'SUPERVISOR':
        return 'Colectivos'; 
      case 'OPERADOR':
        return 'TareasAsignadas'; 
      case 'GERENTE':
        return 'MetricaBitacora'
      default:
        return 'Home'; 
    }
  };

  const [activeMenu, setActiveMenu] = useState(getDefaultMenu(userRole)); 

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="DashboardWrapper">
      <NavBar />
      <div className="MainContent">
        <div className="Sidebar"> 
          {userRole === 'ADMINISTRADOR' && (
            <>
              <div className={`MenuItem ${activeMenu === 'Colectivos' ? 'active' : ''}`} onClick={() => handleMenuClick('Colectivos')}>Colectivos</div>
              <div className={`MenuItem ${activeMenu === 'Registro' ? 'active' : ''}`} onClick={() => handleMenuClick('Registro')}>Registro de colectivo</div>
              <div className={`MenuItem ${activeMenu === 'Inventario' ? 'active' : ''}`} onClick={() => handleMenuClick('Inventario')}>Inventario</div>
              <div className={`MenuItem ${activeMenu === 'Mantenimientos' ? 'active' : ''}`} onClick={() => handleMenuClick('Mantenimientos')}>Mantenimientos</div>
              <div className={`MenuItem ${activeMenu === 'Choferes' ? 'active' : ''}`} onClick={() => handleMenuClick('Choferes')}>Choferes</div>
            </>
          )}
          {userRole === 'SUPERVISOR' && (
            <>
              <div className={`MenuItem ${activeMenu === 'Colectivos' ? 'active' : ''}`} onClick={() => handleMenuClick('Colectivos')}>Colectivos</div>
              <div className={`MenuItem ${activeMenu === 'Inventario' ? 'active' : ''}`} onClick={() => handleMenuClick('Inventario')}>Inventario</div>
              <div className={`MenuItem ${activeMenu === 'Pedidos' ? 'active' : ''}`} onClick={() => handleMenuClick('Pedidos')}>Pedidos</div>
            </>
          )}
          {userRole === 'OPERADOR' && (
            <>
              <div className={`MenuItem ${activeMenu === 'TareasAsignadas' ? 'active' : ''}`} onClick={() => handleMenuClick('TareasAsignadas')}>Mis tareas</div>
              <div className={`MenuItem ${activeMenu === 'AsignarTarea' ? 'active' : ''}`} onClick={() => handleMenuClick('AsignarTarea')}>Pendientes</div>
            </>
          )}
           {userRole === 'GERENTE' && (
            <>
              <div className={`MenuItem ${activeMenu === 'MetricaBitacora' ? 'active' : ''}`} onClick={() => handleMenuClick('MetricaBitacora')}>Métrica de Bitácora de Mantenimiento y Uso</div>
              <div className={`MenuItem ${activeMenu === 'MetricaStock' ? 'active' : ''}`} onClick={() => handleMenuClick('MetricaStock')}>Métrica de Gestión de Stock y Compras</div>
              <div className={`MenuItem ${activeMenu === 'MetricaFlota' ? 'active' : ''}`} onClick={() => handleMenuClick('MetricaFlota')}>Métrica de Gestión de Controles de Flota</div>
              <div className={`MenuItem ${activeMenu === 'Inconsistencias' ? 'active' : ''}`} onClick={() => handleMenuClick('Inconsistencias')}>Inconsistencias</div>
            </>
          )}
        </div>
        <div className="ContentArea"> 
          <Principal activeMenu={activeMenu} />
        </div>
      </div>
    </div>
  );
};

export default Home;
