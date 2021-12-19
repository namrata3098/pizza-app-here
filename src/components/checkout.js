import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { DialogContent } from '@mui/material';
import ControlledAccordions from '../utils/accordians';
import Typography from '@mui/material/Typography';

let data = [];

class  Checkout extends React.Component{
    constructor(){
        super();
        this.state = {
            openDialog : false
        }
    }
 render (){
     let cost = 0;
     
     const helloButton = () => {
         this.setState({ openDialog : true});
         data =  JSON.parse(localStorage.getItem('orders'));
     }

     const closeDialog = () => {
         this.setState({ openDialog : false})
     }
     const closeDialogReturn = () => {
         data = [];
        localStorage.setItem('orders', JSON.stringify(data));
        localStorage.setItem('clear',true);
        this.setState({ openDialog : false});
        window.location.reload();
     }
    return (
        <div>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={helloButton}>
              <Badge color="error">
                <ShoppingCartOutlinedIcon/>  
              </Badge>
            </IconButton>
            <Dialog open={this.state.openDialog} fullWidth>
                <DialogTitle style={{color: 'teal'}}>CHECKOUT</DialogTitle>
                <DialogContent>
                { data.length > 0 ? 
                data.map((el) => {
                    cost += el.price
                    return <ControlledAccordions data={el}/>
                }) :   <div>
                            <p> oops add item to cart</p>
                        </div> 
                }
                 <Typography sx={{ width: '33%', flexShrink: 0 }}>
                   Total Price  Rs. {cost}
                </Typography>
                </DialogContent>
                <div style={{display:'flex' , flexWrap:'wrap' , justifyContent : 'center'}}>
                <Button onClick={closeDialog}>
                  RETURN
                </Button>
                <Button onClick={closeDialogReturn}>
                  CHECKOUT
                </Button>
                </div>
            </Dialog>
            </div>
                    
    )
 }
}

export default Checkout;