import React from 'react'

export const Principal = ({ activeMenu }) => {
  return (
    <div>
    {activeMenu === 'Home' && <h2>Bienvenido a la Página de Inicio</h2>}
    {activeMenu === 'Profile' && <h2>Aquí está tu Perfil</h2>}
    {activeMenu === 'Settings' && <h2>Ajustes</h2>}
  </div>
  )
}

export default Principal