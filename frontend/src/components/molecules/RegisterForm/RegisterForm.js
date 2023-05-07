import React from "react";
import "./RegisterForm.scss";
import { PATHS } from "utils/consts";
import useAuth from "hooks/useAuth";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";

export default function RegisterForm() {
  const { register, error } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      first_name: formData.get("name"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    register(data);
  };

  return (
    <Grid item xs={12} sm={8} md={5} elevation={6} flex={1}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" borderColor="black">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            {error && <p>Incorrect email or password. Please try again.</p>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={PATHS.login} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}
