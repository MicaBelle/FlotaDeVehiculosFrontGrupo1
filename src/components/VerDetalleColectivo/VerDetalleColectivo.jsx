import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from "@nextui-org/react";
import colectivoImagen from '../../assets/Images/LogoNavBar.jpeg'


export const VerDetalleColectivo = ({ colectivo, irAtras, editar}) => {
  return (
    <>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
      <Image
          alt="Imagen del colectivo"
          height={40}
          radius="sm"
          src={colectivoImagen}  
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md"><strong>Colectivo {colectivo.patente}</strong></p>
          <p className="text-small text-default-500">Chofer: {colectivo.chofer}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p><strong>Patente:</strong> {colectivo.patente}</p>
        <p><strong>Chasis:</strong> {colectivo.chasis}</p>
        <p><strong>Antigüedad:</strong> {colectivo.antiguedad} años</p>
        <p><strong>Kilometraje:</strong> {colectivo.kilometraje} km</p>
        <p><strong>Litros de Tanque:</strong> {colectivo.litrosTanque} L</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button color="primary" onClick={editar}>Editar</Button>
        <Button color="secondary" onClick={irAtras}>Volver</Button>
      </CardFooter>
    </Card>
    </>
  );
};

export default VerDetalleColectivo;
