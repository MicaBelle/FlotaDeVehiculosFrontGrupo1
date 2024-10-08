import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from "@nextui-org/react";
import mantenimientoImagen from '../../assets/Images/LogoNavBar.jpeg';
import { verMantenimientoPorVehiculo } from '../../services/mantenimientoService'; 

export const VerDetalleMantenimiento = ({ idVehiculo, token, irAtras }) => {
  const [mantenimiento, setMantenimiento] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMantenimiento = async () => {
      try {
        const response = await verMantenimientoPorVehiculo(idVehiculo, token); 
        if (response.mantenimientos.length > 0) {
          setMantenimiento(response.mantenimientos[0]); 
        } else {
          setError("No se encontró ningún mantenimiento para este vehículo.");
        }
      } catch (error) {
        setError("Error al cargar los detalles del mantenimiento.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMantenimiento();
  }, [idVehiculo, token]);

  if (isLoading) {
    return <p>Cargando detalles del mantenimiento...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!mantenimiento) {
    return <p>No hay datos disponibles.</p>;
  }

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="Imagen del mantenimiento"
          height={40}
          radius="sm"
          src={mantenimientoImagen}  
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md"><strong>Mantenimiento para Colectivo {mantenimiento.vehiculo.patente}</strong></p>
          <p className="text-small text-default-500">Realizado por: {mantenimiento.operador.usuario}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p><strong>Patente:</strong> {mantenimiento.vehiculo.patente}</p>
        <p><strong>Fecha de Inicio:</strong> {mantenimiento.fechaInicio}</p>
        <p><strong>Fecha de Finalización:</strong> {mantenimiento.fechaFinalizacion}</p>
        <p><strong>Asunto:</strong> {mantenimiento.asunto}</p>
        <p><strong>Repuesto Utilizado:</strong> {mantenimiento.itemUtilizado.map(item => item.item).join(', ')}</p>
        <p><strong>Descripción:</strong> Aquí va una descripción del mantenimiento</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button color="secondary" onClick={irAtras}>Volver</Button>
      </CardFooter>
    </Card>
  );
};

export default VerDetalleMantenimiento;
