import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import OutlinedInput from "@mui/material/OutlinedInput";
import { InputAdornment } from '@mui/material';

const theme = createTheme();

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  
  const toggleVisibility = ()=>{
      setShowPassword(!showPassword)
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"/>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              style = {{background: 'white', color:'black' }}
            />
            <OutlinedInput
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword? "text":"password"}
              id="password"
              style = {{background: 'white', color: 'black'}}
              endAdornment = {
                  <InputAdornment position = 'end'>
                    <IconButton onClick={toggleVisibility}>
                        {showPassword? <VisibilityIcon/> : <VisibilityOffIcon/>}
                    </IconButton>
                  </InputAdornment>
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In/ Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}