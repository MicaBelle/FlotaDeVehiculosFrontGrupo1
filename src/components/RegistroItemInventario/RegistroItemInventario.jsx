import React, { useState } from 'react';
import '../RegistroDeCoelctivo/styles/RegistroDeColectivo.css';
import { Button } from '@nextui-org/react';

export const RegistroItemInventario = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    umbral: 0,
    stock: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };


  return (
    <div className="container">
      <h2>Registro de Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Umbral:
            <input
              type="number"
              name="umbral"
              value={formData.umbral}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Stock:
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <Button color='success' type="submit">Registrar Item</Button>
        <Button color='danger' type="button" onClick={onCancel}>Cancelar</Button>
      </form>
    </div>
  );
};
