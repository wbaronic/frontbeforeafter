import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants.js'
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar.js';
import EditCar from './EditCar.js';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    const token = sessionStorage.getItem("jwt"); 
    fetch(SERVER_URL + 'api/medidasInternases',{
      headers: { 'Authorization' : token }
    })
    .then(response => response.json())
    .then(data => setCars(data._embedded.medidasInternases))
    .catch(err => console.error("fetch errot"+ err));    
  }
  
  const onDelClick = (url) => {
    if (window.confirm("Are you sure to delete?")) {
      fetch(url,  {method:  'DELETE'})
      .then(response => {
        if (response.ok) {
          fetchCars();
          setOpen(true);
        }
        else {
          alert('Something went wrong!');
        }
      })
      .catch(err => console.error(err))
    }
  }
  
  // Add a new car 
  const addCar = (car) => {
   
    const token = sessionStorage.getItem("jwt"); 

    fetch(SERVER_URL  +  'api/medidasInternases',
      { method: 'POST', headers: {
        'Content-Type':'application/json',
        'Authorization' : token
      },
      body: JSON.stringify(car)
    })
    .then(response => {
      if (response.ok) {
        fetchCars();
      }
      else {
        alert('Something went wrong!');
        console.error(JSON.stringify(car));
      }
    })
    .catch(err => console.error(err))
  }

  // Update existing car
  const updateCar = (car, link) => {
    const token = sessionStorage.getItem("jwt"); 

    fetch(link,
      { 
        method: 'PUT', 
        headers: {
        'Content-Type':  'application/json',
        'Authorization' : token
      },
      body: JSON.stringify(car)
    })
    .then(response => {
      if (response.ok) {
        fetchCars();
      }
      else {
        alert('Something went wrong!');
      }
    })
    .catch(err => console.error(err))
  }
   
  const columns = [
    {field: 'date', headerName: 'Date', width: 200},
    {field: 'kg', headerName: 'kg', width: 200},
    {field: 'fat', headerName: 'Fat', width: 200},
    {field: 'water', headerName: 'Water', width: 150},
    {field: 'muscle', headerName: 'Muscle', width: 150},
    {field: 'kcal', headerName: 'Kcal', width: 150},
    {field: 'bone', headerName: 'Bone', width: 150},

    {
      field: '_links.car.href', 
      headerName: '', 
      sortable: false,
      filterable: false,
      renderCell: row => <EditCar 
                            data={row} 
                            updateCar={updateCar} />
    },
    {
      field: '_links.self.href', 
      headerName: '', 
      sortable: false,
      filterable: false,
      renderCell: row => 
      <IconButton onClick={() => onDelClick
        (row.id)}>
      <DeleteIcon color="error" />
    </IconButton>
    }
  ];
  
  return(
    <React.Fragment>
      
      <Stack mt={2} mb={2}>
        <AddCar addCar={addCar} />
      </Stack>
    
    
    
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid 
          rows={cars} 
          columns={columns} 
          disableSelectionOnClick={true}
          getRowId={row => row._links.self.href}
          components={{ Toolbar: CustomToolbar }}
        />
   
      </div>


      <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted"
        />


    </React.Fragment>
  );
}

export default Carlist;