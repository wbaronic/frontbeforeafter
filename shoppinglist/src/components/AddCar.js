import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

//datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


function AddCar(props) {


  const [startDate, setStartDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    date: '',
    fat: '',
    water: '', 
    muscle: '',  
    kcal: '',  
    kg: '',  
    bone: ''
  });

  // Open the modal form
  const handleClickOpen = () => {
    setOpen(true);
  };
    
   
  
  // Close the modal form 
  const handleClose = () => {
    setOpen(false);
  };

  // Save car and close modal form 
  const handleSave = () => {
    props.addCar(car);
    handleClose();
  }

  const handleChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
  }
  
  return(
    <div>
      <Button variant="contained" onClick={handleClickOpen}>Novas medidas</Button>
    
    
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novas medidads</DialogTitle>
        <DialogContent>
        <Stack spacing={2} mt={1}>
             



        <DatePicker 
        selected={startDate} 
        variant="standard"
        onChange={(date) => setStartDate(date)}
         />

            <TextField label="date" name="date" 
                variant="standard" value={car.date =startDate.toISOString().split('T')[0]}
                disabled="disabled"
                onChange={handleChange}/>
             
              <TextField label="kg" name="kg" 
                  autoFocus
                variant="standard" value={car.kg} 
                onChange={handleChange}/>


          <TextField label="height" name="height" 
                  autoFocus
                variant="standard" value={car.height} 
                onChange={handleChange}/>
             
              <TextField label="water" name="water" 
                variant="standard" value={car.water} 
                onChange={handleChange}/>
              <TextField label="muscle" name="muscle" 
                variant="standard" value={car.muscle} 
                onChange={handleChange}/>
              <TextField label="kcal" name="kcal" 
                variant="standard" value={car.kcal} 
                onChange={handleChange}/>

            <TextField label="bone" name="bone" 
                variant="standard" value={car.bone} 
                onChange={handleChange}/>
            </Stack>
        </DialogContent>
        <DialogActions>
           <button onClick={handleClose}>Cancel</button>
           <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>            
    </div>
  );  
}

export default AddCar;