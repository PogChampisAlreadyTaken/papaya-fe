import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Basket from './Basket';

export default function CustomAppBar() {
  const [show, setShow] = React.useState(false)
  return (  
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
      {show && <Basket/>}

        <Toolbar>
          <Button color="inherit" style={{float:"right"}} onClick={() => {
            setShow(!show)
          }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

