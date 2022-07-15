import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
export default function SearchComponent({ options, value, setValue }){
    
    return(<Autocomplete
        inputValue={ value }
        onInputChange={(event, newValue) => {
            setValue(newValue);
        }}

        freeSolo={ true }
        disablePortal
        id="combo-box-demo1"
        options={ options ? options : [''] }
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" />}
        
    />)
}



        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}

        // const [value, setValue] = useState(options[0]);
    // const [inputValue, setInputValue] = useState('');


