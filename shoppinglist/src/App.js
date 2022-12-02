import React, { useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Carlist from './components/CarList.js';
import Login from './components/Login';



function App() {

  const [items, setItems] = useState([]);
  const addItem = (item) => {
    setItems([item, ...items]);
  }


  return (

    <div className="APP">
      <AppBar position='static'>
        <toolbar>
          <Typography variant='h6'>
            CarShop
          </Typography>
        </toolbar>
      </AppBar>
      <Login />


    </div>


  );
}
export default App;

