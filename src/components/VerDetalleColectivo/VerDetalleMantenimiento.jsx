import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from "@nextui-org/react";
import mantenimientoImagen from '../../assets/Images/LogoNavBar.jpeg';

export const VerDetalleMantenimiento = ({ mantenimiento, irAtras }) => {
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
          <p className="text-md"><strong>Mantenimiento para Colectivo {mantenimiento.patente}</strong></p>
          <p className="text-small text-default-500">Realizado por: {mantenimiento.realizadoPor}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p><strong>Patente:</strong> {mantenimiento.patente}</p>
        <p><strong>Fecha del Mantenimiento:</strong> {mantenimiento.fecha}</p>
        <p><strong>Repuesto Usado:</strong> {mantenimiento.repuesto}</p>
        <p><strong>Descripcion:</strong> Aca va una descripcion del matenimeinto</p>

       
      </CardBody>
      <Divider />
      <CardFooter>
        <Button color="secondary" onClick={irAtras}>Volver</Button>
      </CardFooter>
    </Card>
  );
};

export default VerDetalleMantenimiento;
