import { Button, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';



export default function SelectInputComponent() {


    return (
        <Grid container direction={"column"} spacing={2}>
          
          <Grid item> </Grid>
            <Grid item> 
            <TextField
                required
                id="first_name"
                label="Required"
                defaultValue="Imie"
            />
            </Grid>
            <Grid item>
                 <TextField
                required
                id="last_name"
                label="Required"
                defaultValue="Nazwisko"
            />
            </Grid>
            <Grid item>
                <TextField
                required
                id="email"
                label="Required"
                defaultValue="Email"
            />
            </Grid>

        </Grid>
    );
}