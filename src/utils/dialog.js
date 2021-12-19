import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RowRadioButtonsGroup from './radio';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
export default function FormDialog(props) {
  let toppingListArray=[];
  let selectedSize;
  let id = props.id;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAdd = () => {
    props.handleOrders(toppingListArray,selectedSize,id);
    setOpen(false);
  };

  const handleChangeToppings = (events) => {
    toppingListArray.push(events)
  }
  const handleChange = (events) => {
    selectedSize = events;
}

  const HandleRemove = () => {
    props.handleRemove(id);
  }

  return (
    <div>
      
      { props.count > 0 ? 
      <div style={{display:'flex' ,justifyContent:'space-evenly'}}> 
        <Button  onClick={handleClickOpen}> 
            <AddCircleOutlineIcon/> 
            </Button> 
            <Button> 
            {props.count}
            </Button>
             
        <Button onClick ={HandleRemove}>
         <RemoveCircleOutlineIcon/>
        </Button>
     </div> 
      : <div> <Button  onClick={handleClickOpen}> ADD </Button> </div>}
        
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Make your choise</DialogTitle>
        <DialogContent>
          <DialogContentText style={{color:'black'}}>
             SIZE
          </DialogContentText>
        <RowRadioButtonsGroup size={props.size[0].items} isType="size" handleChange={handleChange}/>
        <DialogContentText style={{color:'black'}}>
             TOPPINGS
          </DialogContentText>
        <RowRadioButtonsGroup toppings={props.toppings[0].items} isType="checkbox" handleChangeToppings={handleChangeToppings} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseAdd}>ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
