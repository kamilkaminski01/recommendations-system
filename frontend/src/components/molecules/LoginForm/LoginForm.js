import React, { useState } from "react";
import "./LoginForm.scss";
import { PATHS } from "utils/consts";
import useAuth from "hooks/useAuth";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Link from "@mui/material/Link";
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
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
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  name="login"
                  autoComplete="login"
                  onChange={(event) => setEmail(event.target.value)}
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
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Log in
            </Button>
            {error && <p>Incorrect email or password. Please try again.</p>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={PATHS.register} variant="body2">
                  Create your account
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}
