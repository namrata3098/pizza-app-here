import React, * as react from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormDialog from './dialog';

class Cards extends React.Component {  
    render() {
        

        const handleOrders = (toppings,size,id) => {
            let incomingOrders = [];
            incomingOrders.push({ 'size': size ,'toppings' : toppings , 'pizza_id':id});
            this.props.handleOrders(incomingOrders);
        }

        const handleRemove = (id) => {
            this.props.handleRemove(id);
        }

        return (
            <div style={{ padding : "1%"}}>
                <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={this.props.data.img_url}
                            alt="veg pizza"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {this.props.data.name}
                            </Typography>
                            <Typography variant="body2">
                               {this.props.data.isVeg ? <p style={{color:'green'}}>VEG</p> : <p style={{color: 'red'}}>NON-VEG</p>}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                               {this.props.data.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <div style={{display:'flex' , justifyContent: 'space-evenly'}}>
                                <p style={{color:'black' , fontWeight:'bold'}}>Rs:{this.props.data.price}</p>
                               <p style={{color:'green' , fontWeight:'bold'}}>rating : {this.props.data.rating}</p>
                               </div>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <FormDialog size={this.props.data.size} toppings={this.props.data.toppings} handleOrders={handleOrders} id={this.props.data.id} count={this.props.data.count} handleRemove={handleRemove}/>
                        </CardActions>
                    </Card>
            </div>
        )
    }
}

export default Cards;