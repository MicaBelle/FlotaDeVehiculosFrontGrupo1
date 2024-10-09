import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from "@nextui-org/react";
import mantenimientoImagen from '../../assets/Images/LogoNavBar.jpeg';
import { finalizarMantenimiento } from '../../services/mantenimientoService'; 
import TablaDeInventario from '../RegistroItemInventario/TablaInventario';


const TarjetaMantenimiento = ({ tarea, token, onTareaFinalizada }) => {
  const [itemUsado, setItemUsado] = useState(null); 
  const [mostrarInventario, setMostrarInventario] = useState(false); 
  const [cantidad, setCantidad] = useState(1); 
  const [repuestoSeleccionado, setRepuestoSeleccionado] = useState(''); 

  const handleFinalizarTarea = async () => {
    try {
      if (!itemUsado) {
        alert("Por favor, seleccione un ítem para descontar del stock");
        return;
      }

      const data = {
        items: [
          {
            idItem: tarea.id, 
            cantidad: cantidad, 
          },
        ],
      };
      console.log(data);


      await finalizarMantenimiento(tarea.id, data, token);

      alert("Tarea finalizada y el ítem ha sido descontado del stock.");
      onTareaFinalizada(tarea.id); 

    } catch (error) {
      alert("Error al finalizar la tarea.");
    }
  };

  const handleItemSeleccionado = (id, nombre) => {
    setItemUsado({ id, nombre }); 
    setRepuestoSeleccionado(nombre); 
    setMostrarInventario(false); 
  };

  return (
    <Card className="max-w-[400px]" key={tarea.id}>
      <CardHeader className="flex gap-3">
        <Image
          alt="Imagen de la tarea"
          height={40}
          radius="sm"
          src={mantenimientoImagen}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md font-bold">{tarea.asunto}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Estado: {tarea.estadoMantenimiento}</p>
        <p>Operador: {tarea.operador.usuario}</p> 
        <p>Vehículo: {tarea.vehiculo.patente}</p>
        <p>Asunto: {tarea.asunto}</p>
        
        <Button 
          color="primary" 
          onClick={() => setMostrarInventario(true)} 
        >
          Seleccionar Repuesto
        </Button>
        
        {mostrarInventario && ( 
          <TablaDeInventario userRole="OPERADOR" onItemSeleccionado={handleItemSeleccionado} />
        )}
        
        {repuestoSeleccionado && ( 
          <p className="mt-4">Repuesto a utilizar: {repuestoSeleccionado}</p>
        )}
        
        {itemUsado && ( 
          <div>
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)} 
              min="1"
            />
          </div>
        )}
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          color="secondary"
          onClick={handleFinalizarTarea}
        >
          Finalizar Tarea
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TarjetaMantenimiento;