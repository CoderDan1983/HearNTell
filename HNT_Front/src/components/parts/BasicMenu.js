//@ Taken from material ui website, so to speak :)

import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

//* the general are true for all BasicMenus in a group.
//* the special is unique to this basic menu 
//*(but the same for all menuitems in this basic menu) :)

export default function BasicMenu({ menu }) {
  const [ anchorEl, setAnchorEl ] = useState(null);
  const { general, special } = menu;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MenuIcon 
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={ handleClick } 
      />
      <Menu
        id="basic-menu"
        anchorEl={ anchorEl }
        open={ open }
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        { general && general.length && general.map((item, i) => {
          return (
            <MenuItem 
              onClick={ (e) => {
                item.handleClick(e, i, { general, special } )
                handleClose(e);
              }}
              key = { i }
            >
              { item.title }
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  );
}