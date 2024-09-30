import React from "react";

export function AsignarOperador({ colectivo, onClose }) {
  const handleAsignar = () => {
    alert(`Operador asignado al colectivo: ${colectivo.patente}`);
    onClose(); 
  };

  return (
    <div>
      <h2>Asignar Operador a {colectivo.patente}</h2>
      <Button onClick={handleAsignar}>Asignar</Button>
      <Button color="default" onClick={onClose}>Cancelar</Button>
    </div>
  );
}
