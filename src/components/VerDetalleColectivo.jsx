import React from 'react';

export const VerDetalleColectivo = ({ colectivo }) => {
  return (
    <div>
      <h3>Detalles del Colectivo</h3>
      <p><strong>Patente:</strong> {colectivo.patente}</p>
      <p><strong>Chasis:</strong> {colectivo.chasis}</p>
      <p><strong>Antigüedad:</strong> {colectivo.antiguedad} años</p>
      <p><strong>Kilometraje:</strong> {colectivo.kilometraje} km</p>
      <p><strong>Litros de Tanque:</strong> {colectivo.litrosTanque} L</p>
      <p><strong>Chofer:</strong> {colectivo.chofer}</p>
    </div>
  );
};

export default VerDetalleColectivo;
