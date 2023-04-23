import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import axios from "axios";

export default function AddAdvertisementComponent() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const API_URL = "http://localhost:8000/api/";
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const stateTemp = {
      title: data.get("title"),
      description: data.get("description"),
      type: data.get("type"),
      reward_for_approval: data.get("reward_for_approval"),
    };
    console.log(stateTemp);
    axios.post(API_URL + "advertisements/", stateTemp).then((response) => {
      window.location.reload(true);
    });

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Dodaj oferte
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Formularz oferty</DialogTitle>
        <DialogContent>
          <DialogContentText>Dodaj swoja oferte.</DialogContentText>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container direction={"column"} spacing={2}>
              <Grid item> </Grid>
              <Grid item>
                <TextField required id="title" name="title" label="Title" />
              </Grid>
              <Grid item>
                <TextField required id="description" name="description" label="Description" />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="reward_for_approval"
                  name="reward_for_approval"
                  label="Reward for approval"
                />
              </Grid>
              <Grid item justify="flex-right">
                <TextField required id="type" name="type" label="Type" />
              </Grid>
              <Grid item style={{ alignItems: "right" }}>
                <Button style={{ marginRight: "20px" }} onClick={handleClose} variant="outlined">
                  Anuluj
                </Button>
                <Button type="submit" variant="outlined">
                  Dodaj oferte!
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
