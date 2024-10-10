import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from "@nextui-org/react";
import mantenimientoImagen from '../../assets/Images/LogoNavBar.jpeg';
import { finalizarMantenimiento } from '../../services/mantenimientoService'; 
import TablaDeInventario from '../RegistroItemInventario/TablaInventario';

const TarjetaMantenimiento = ({ tarea, token, onTareaFinalizada }) => {
  const [itemsUsados, setItemsUsados] = useState([]); 
  const [mostrarInventario, setMostrarInventario] = useState(false); 

  const handleFinalizarTarea = async () => {
    try {
      if (itemsUsados.length === 0) {
        alert("Por favor, seleccione al menos un ítem para descontar del stock");
        return;
      }

      const data = {
        items: itemsUsados.map(item => ({
          idItem: item.id,
          cantidad: item.cantidad,
        })),
      };
      console.log(data);

      await finalizarMantenimiento(tarea.id, data, token);

      alert("Tarea finalizada y los ítems han sido descontados del stock.");
      onTareaFinalizada(tarea.id);

    } catch (error) {
      alert("Error al finalizar la tarea.");
    }
  };

  const handleItemSeleccionado = (id, nombre) => {
    const existe = itemsUsados.find(item => item.id === id);
    if (existe) {
      alert("Este ítem ya ha sido seleccionado.");
      return;
    }

    setItemsUsados([...itemsUsados, { id, nombre, cantidad: 1 }]); 
    setMostrarInventario(false); 
  };

  const handleCantidadChange = (id, nuevaCantidad) => {
    setItemsUsados(prevItems => 
      prevItems.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
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

        {itemsUsados.length > 0 && (
          <div className="mt-4">
            <h4>Repuestos seleccionados:</h4>
            {itemsUsados.map(item => (
              <div key={item.id} className="mb-2">
                <p>Repuesto: {item.nombre}</p>
                <label htmlFor={`cantidad-${item.id}`}>Cantidad:</label>
                <input
                  type="number"
                  id={`cantidad-${item.id}`}
                  value={item.cantidad}
                  onChange={(e) => handleCantidadChange(item.id, e.target.value)}
                  min="1"
                />
              </div>
            ))}
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
};

export default TarjetaMantenimiento;
