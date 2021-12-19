import * as React from 'react';
import Cards from '../utils/mediaCard';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Alert from '@mui/material/Alert';

let pizzaOrdered = [];

class MediaCard extends React.Component {
    constructor(){
        super()
        this.state = {
            list : [],
            orders: [],
            open : false,
            exsistingOrders : []
        }

       
    }
   

    componentDidMount() {
        let list;
           axios.get('https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68').then((response) => {
                list = response.data.map((el) => {
                   el.count = 0
                   return el
               })
               this.setState({list : list})
           });
    }


    render(){
        const handleOrders = (incomingOrders) => {
            let pizzaDetails;
            this.state.list.map((el , index) => {
              if(el.id == incomingOrders[0].pizza_id){
                pizzaDetails = el;
                el.count += 1
                this.setState(prevState => {
                    let jasper = Object.assign({}, prevState.list[index]);  // creating copy of state variable jasper
                    jasper.count += 1 ;                     // update the name property, assign a new value                 
                    return { jasper };                                 // return new object jasper object
                  })
            }
            });
            pizzaOrdered.push({
                'name' : pizzaDetails.name,
                'veg/non-veg' : pizzaDetails.isVeg ? 'Veg' : 'Non-veg',
                'price' : pizzaDetails.price,
                ...incomingOrders[0],
                'orderNo' : Math.floor((Math.random() * 100) + 1)
            })
            this.setState({orders : pizzaOrdered}, () => {
                localStorage.setItem('orders' , JSON.stringify(this.state.orders));
            });
            
        }

        const handleChangeswitch = (event) => {
            let filteredValue;
            if(event.target.checked){
            filteredValue = this.state.list.filter((el) => el.isVeg === true);
            this.setState({ list : filteredValue});
            } else {
                this.componentDidMount()
            }
        }

        const handleClose = () => {
            this.setState({ open : false})
        }

        const handleRemove = (id) => {
            let exsistingOrders = this.state.orders.filter((el) => el.pizza_id == id );
            this.setState({ open: true});
            this.setState({ exsistingOrders : exsistingOrders})
        }
        const removeOrder = (event) => {
            let id ;
            let removeOrdered = this.state.orders.map((el) => {
                if(el.orderNo == event.target.value){
                    id = el.pizza_id
                }
                else return el;
            });
            
            let final =[];
            removeOrdered.map(element => {
                if(element != undefined) final.push(element);
            });
            this.setState({ orders : final}, () => {
                let orders = this.state.orders
                localStorage.setItem('orders' , JSON.stringify(orders));
            });
            this.state.list.map((el , index) => {
                if(el.id == id) { 
                    el.count -= 1;                   
                  this.setState(prevState => {
                      let jasper = Object.assign({}, prevState.list[index]);  // creating copy of state variable jasper
                      jasper.count -= 1 ;                     // update the name property, assign a new value                 
                      return { jasper };                                 // return new object jasper object
                    })
              }
              }, () => console.log(this.state.list));
              this.setState({ open: false} , () => {
                alert('Removed from cart');
              });
              
        }

        return (
            <div>
                <div style={{marginRight: '88%'}}><Switch onChange={handleChangeswitch} name="OnlyVeg" /> Only Veg</div>
            <div style={{display : 'flex' , flexWrap: 'wrap' , alignContent:'center'}}>
                {this.state.list.map((each) => {
                    return (
                    <Box>
                   <Cards data = {each} handleOrders={handleOrders} handleRemove={handleRemove} />
                   <Dialog open={this.state.open} onClose={handleClose}>
                   <DialogTitle>REMOVE ORDER</DialogTitle>
                   <DialogContent>
                     <DialogContentText style={{color:'black'}}>
                        you have more than 2 of the same pizza 
                     </DialogContentText>
                     {this.state.exsistingOrders.map((el) => {
                          return    <div style={{ border : '1px solid silver' , boxShadow: '1px' , marginTop: '2%', padding:'2%'}}>
                                        <FormControlLabel value={el.orderNo} control={<Checkbox />} label={el.name} onClick={removeOrder}/>
                                        <div style={{color: 'black' , display:'flex' , justifyContent:'space-evenly'}}>
                                            <p>PRICE : {el.price}</p>
                                            <p>SIZE : {el.size}</p>
                                        </div>
                                        <p style={{color:'black'}}>Toppings : {el.toppings}</p>
                                    </div> 
                     })}
                   </DialogContent>
                   <DialogActions>
                     <Button onClick={handleClose}>Cancel</Button>
                   </DialogActions>
                 </Dialog>
                 </Box>
                    )
                })}
              
        </div>
        </div>
            );
        }
}

export default MediaCard;
