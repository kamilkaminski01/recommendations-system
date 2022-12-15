import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import NightlightIcon from '@mui/icons-material/Nightlight';
import IconButton from '@mui/material/IconButton';

function Copyright(props) {
  return (
    <Typography variant="body2"  align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Uwb Riders
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      news: data.get('news'),
    });
  };


  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const whiteTheme = createTheme({
    palette: {
  
    },
  });

  const [darkMode, setDarkMode] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const onClick=() =>{
      {darkMode ? setDarkMode(false): setDarkMode(true)};
    }






  return (
    <ThemeProvider theme={darkMode ? darkTheme : whiteTheme}>
    <CssBaseline />
    <Grid item xs={12}  sm={8} md={5}  elevation={6} square>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid item xs={4}>
            <IconButton color="inherit">
                <Badge color="secondary" onClick={onClick}>
                  {darkMode
                  ?<LightModeIcon titleAccess='Motyw jasny'/>
                  :<NightlightIcon titleAccess='Motyw ciemny'/> 
                }
                <Typography >Motyw</Typography>
                </Badge>
              </IconButton>
            </Grid>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" borderColor="black">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                 
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  id='news'
                  name='news'
                  defaultValue={false}
                  control={<Checkbox value={true} color="primary" sx={{}} />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/singin " variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Grid>
  </ThemeProvider>
  );
}