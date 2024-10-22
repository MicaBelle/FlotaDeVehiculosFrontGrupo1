import React, { useState } from 'react';
import '../RegistroDeColectivo/styles/RegistroDeColectivo.css';
import { Button } from '@nextui-org/react';

export const RegistroModificarPresupuesto = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    presupuesto: 0,
    cantDePedidoAutomatico: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value < 0) {
      alert('No se permiten valores negativos');
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      presupuesto: parseFloat(formData.presupuesto),
      cantDePedidoAutomatico: parseInt(formData.cantDePedidoAutomatico),
    };

    onSubmit(data);
  };

  return (
    <div className="container">
      <h2>Modificar Presupuesto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">
            Nuevo Presupuesto:
            <input
              type="number"
              name="presupuesto"
              value={formData.presupuesto}
              onChange={handleChange}
              min="0"
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Cantidad para Pedido Automático:
            <input
              type="number"
              name="cantDePedidoAutomatico"
              value={formData.cantDePedidoAutomatico}
              onChange={handleChange}
              min="0"
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="button-group">
          <Button color="success" type="submit">Modificar</Button>
          <Button color="danger" type="button" onClick={onCancel}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
};

export default RegistroModificarPresupuesto;
