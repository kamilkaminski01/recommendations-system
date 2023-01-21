import React from 'react';
import { Grid } from '@material-ui/core';
import {Button} from '@material-ui/core';
import { Link } from 'react-router-dom';



export default function RedirectButton(props){

    return(
    <>
        <Grid>
            <Button component={Link} onClick={props.onClick} to={{pathname: props.url,}}
                onChange={props.onChange} state={props.state} variant="contained">{props.name}
            </Button>
        </Grid>
    </>
    );
}