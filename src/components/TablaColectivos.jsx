import React, { useEffect, useState } from 'react';
import { Button,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

//import axios from 'axios';

const columns = [
  {
    key: "patente",
    label: "PATENTE",
  },
  {
    key: "chasis",
    label: "CHASIS",
  },
  {
    key: "antiguedad",
    label: "ANTIGÜEDAD",
  },
  {
    key: "kilometraje",
    label: "KILOMETRAJE",
  },
  {
    key: "litrosTanque",
    label: "LITROS DE TANQUE",
  },
  {
    key: "chofer",
    label: "CHOFER",
  },
  {
    key: "actions", 
    label: "ACCIONES",
  },
];

/*export function TablaDeColectivos() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/colectivos'); 
        const data = response.data;

        
        const mappedRows = data.map((item, index) => ({
          key: index.toString(),
          patente: item.patente,
          chasis: item.chasis,
          antiguedad: item.antiguedad,
          kilometraje: item.kilometraje,
          litrosTanque: item.litrosTanque || 800,
          chofer: item.chofer,
        }));

        setRows(mappedRows);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);*/

  export function TablaDeColectivos({ userRole }) {
    const [rows, setRows] = useState([]);
    useEffect(() => {
      const mockData = [
        {
          patente: "ABC123",
          chasis: "XYZ456",
          antiguedad: 5,
          kilometraje: 150000,
          litrosTanque: 800,
          chofer: "Juan Pérez",
        },
        {
          patente: "DEF456",
          chasis: "UVW789",
          antiguedad: 3,
          kilometraje: 80000,
          litrosTanque: 800,
          chofer: "Ana Gómez",
        },
        {
          patente: "GHI789",
          chasis: "RST012",
          antiguedad: 8,
          kilometraje: 200000,
          litrosTanque: 800,
          chofer: "Carlos Martínez",
        },
        {
          patente: "JKL012",
          chasis: "OPQ345",
          antiguedad: 2,
          kilometraje: 50000,
          litrosTanque: 800,
          chofer: "Lucía Fernández",
        },
      ];
  
      const mappedRows = mockData.map((item, index) => ({
        key: index.toString(),
        patente: item.patente,
        chasis: item.chasis,
        antiguedad: item.antiguedad,
        kilometraje: item.kilometraje,
        litrosTanque: item.litrosTanque,
        chofer: item.chofer,
      }));
  
      setRows(mappedRows);
    }, []);

  const handleEdit = (patente) => {
  
    console.log(`Editando colectivo con patente: ${patente}`);
  };

  const handleDelete = (patente) => {

    console.log(`Eliminando colectivo con patente: ${patente}`);
  };

  return (
    <Table aria-label="Tabla de Colectivos">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => {
              const value = getKeyValue(item, columnKey);  
              if (columnKey === "actions") {
                return userRole === "admin" ? (
                  <TableCell>
                    <Button color="warning" onClick={() => handleEdit(item.patente)}>Editar</Button>
                    <Button color="danger" onClick={() => handleDelete(item.patente)}>Eliminar</Button>
                  </TableCell>
                ) : (
                  <TableCell>No tienes permisos</TableCell> 
                );
              }
              return <TableCell>{value}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TablaDeColectivos;
