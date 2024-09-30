import React, { useState } from "react";
import '../RegistroDeControlesRutinarios/styles/RegistroControlesRutinarios.css'; 
import imagen from '../../assets/Images/LogoNavBar.jpeg'

const RegistroControlesRutinarios = () => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    engineStatus: "",
    fluidLevels: "",
    tiresCondition: "",
    lightsAndBrakes: "",
    visualInspection: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* fetch("/api/controles-rutinarios", {
   method: "POST",
  headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(formData),
 })
   .then((response) => response.json())
   .then((data) => {
     console.log("Datos guardados:", data);
  })
  .catch((error) => {
    console.error("Error al enviar los datos:", error);
   });*/
    console.log("Datos enviados:", formData);
   
  };

  return (
    <div className="card">
     
      <div className="card-header">
        <img
          alt="vehículo"
          className="header-image"
          src={imagen}
        />
        <div className="header-text">
          <h3>Revisión de Controles Rutinarios</h3>
          <p>ID del vehículo: {formData.vehicleId || "No asignado"}</p>
        </div>
      </div>

      <hr />

      
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-group">
          <label htmlFor="vehicleId">ID del Vehículo</label>
          <input
            type="text"
            id="vehicleId"
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            placeholder="Ingrese el ID del vehículo"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="engineStatus">Estado del Motor</label>
          <select
            id="engineStatus"
            name="engineStatus"
            value={formData.engineStatus}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Seleccione</option>
            <option value="Bueno">Bueno</option>
            <option value="Regular">Regular</option>
            <option value="Malo">Malo</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fluidLevels">Niveles de Fluidos</label>
          <select
            id="fluidLevels"
            name="fluidLevels"
            value={formData.fluidLevels}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Seleccione</option>
            <option value="Correctos">Correctos</option>
            <option value="Bajos">Bajos</option>
            <option value="Críticos">Críticos</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tiresCondition">Condición de Neumáticos</label>
          <select
            id="tiresCondition"
            name="tiresCondition"
            value={formData.tiresCondition}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Seleccione</option>
            <option value="Bueno">Bueno</option>
            <option value="Desgaste">Desgaste</option>
            <option value="Críticos">Críticos</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="lightsAndBrakes">Luces y Frenos</label>
          <select
            id="lightsAndBrakes"
            name="lightsAndBrakes"
            value={formData.lightsAndBrakes}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Seleccione</option>
            <option value="Funcionan">Funcionan</option>
            <option value="Problemas">Problemas</option>
            <option value="No funcionan">No funcionan</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="visualInspection">Inspección Visual</label>
          <select
            id="visualInspection"
            name="visualInspection"
            value={formData.visualInspection}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Seleccione</option>
            <option value="Sin daños">Sin daños</option>
            <option value="Daños menores">Daños menores</option>
            <option value="Daños graves">Daños graves</option>
          </select>
        </div>

        <hr />

        <button type="submit" className="submit-button">Registrar Control</button>
      </form>
    </div>
  );
};

export default RegistroControlesRutinarios;



