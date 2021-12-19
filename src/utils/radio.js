import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

export default function RowRadioButtonsGroup(props) {
    const handleChange = (event) => {
        props.handleChange(event.target.value);
     };
     
     const handleChangeToppings = (event) => {
         props.handleChangeToppings(event.target.value);
     };

  return (
    <FormControl component="fieldset">
        {props.isType == 'size' ? 
        <RadioGroup row aria-label="gender" name="row-radio-buttons-group"  onChange={handleChange}>
        {props.size.map((each) => {
             return <FormControlLabel value={each.size} control={<Radio />} label={each.size} />
        })
         }
      </RadioGroup> : 
      <FormGroup onChange={handleChangeToppings}>
      {props.toppings.map((each) => {
        return  <FormControlLabel control={<Checkbox />} label={each.name} value={each.name}/>
        })
        }
    </FormGroup>
    }
    </FormControl>
  );
}

