import { Autocomplete, TextField } from '@mui/material';

export default function SearchComponent({ options }){
    console.log('options are: ');
    console.log(options);
    return(<Autocomplete
        freeSolo={ true }
        disablePortal
        id="combo-box-demo1"
        options={ options ? options : [''] }
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" />}
    />)
}