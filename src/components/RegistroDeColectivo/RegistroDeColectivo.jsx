import React, { useState } from 'react';
import './styles/registroDeColectivo.css';
import { useSelector } from 'react-redux';
import { registrar } from "../../services/vehiculoService"; 

export const RegistroDeColectivo = () => {
  const [formData, setFormData] = useState({
    patente: '',
    chasis: '',
    antiguedad: '',
    kilometraje: '',
    litrosDeTanque: 800,
    modelo: '',  
    fechaRevision: '',  
  });

  const token = useSelector((state) => state.user.token); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const fechaRevisionFormateada = new Date(formData.fechaRevision);
    const anio = fechaRevisionFormateada.getFullYear();
    const mes = String(fechaRevisionFormateada.getMonth() + 1).padStart(2, '0'); 
    const dia = String(fechaRevisionFormateada.getDate()).padStart(2, '0');
    const fechaRevisionString = `${dia}/${mes}/${anio}`;
  
    const dataToSubmit = {
      patente: formData.patente,
      antiguedad: parseInt(formData.antiguedad),  
      kilometraje: parseInt(formData.kilometraje),  
      litrosDeTanque: formData.litrosDeTanque,
      modelo: formData.modelo, 
      fechaRevision: fechaRevisionString, 
    };

    try {
      const response = await registrar(dataToSubmit, token);// hay un problema cuando la respuesta es {} 
      console.log('Registro guardado:', response);
    } catch (error) {
      console.error("Error al registrar el colectivo:", error);
      alert("Error al registrar el colectivo. Por favor, intente nuevamente.");
    }
  };
  


  return (
    <div className="container">
      <h2>Registro de Colectivo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">
            Patente:
            <input
              type="text"
              name="patente"
              value={formData.patente}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Chasis:
            <input
              type="text"
              name="chasis"
              value={formData.chasis}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Antigüedad:
            <input
              type="number"
              name="antiguedad"
              value={formData.antiguedad}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Kilometraje:
            <input
              type="number"
              name="kilometraje"
              value={formData.kilometraje}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Litros de Tanque:
            <input
              type="number"
              name="litrosDeTanque" 
              value={formData.litrosDeTanque} 
              readOnly
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Modelo:
            <input
              type="text"
              name="modelo" 
              value={formData.modelo}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Fecha de Revisión:
            <input
              type="date"
              name="fechaRevision"  
              value={formData.fechaRevision}
              onChange={handleChange}
              required
              className="input-field"
            />
          </label>
        </div>
        <button type="submit" className="button">Registrar Colectivo</button>
      </form>
    </div>
  );
};
