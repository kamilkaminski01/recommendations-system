import { useState } from "react";
import axiosDefault from "setup/axios/defaultInstance";
import { generatePath } from "react-router-dom";
import { ENDPOINTS } from "utils/consts";
import { Grid } from "@material-ui/core";
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function RecommendationForm(props) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
    };
    axiosDefault
      .post(generatePath(ENDPOINTS.advertisementDetails, { id: props.id }), data)
      .then(() => {
        window.location.reload(true);
        setOpen(false);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(!open)}>
        Recommend
      </Button>
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogTitle>Provide your candidate details</DialogTitle>
        <DialogContent>
          <DialogContentText>Recommend a potential candidate to receive points</DialogContentText>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <TextField required id="first_name" name="first_name" label="First Name" />
              </Grid>
              <Grid item>
                <TextField required id="last_name" name="last_name" label="Last Name" />
              </Grid>
              <Grid item>
                <TextField required id="email" name="email" label="Email" />
              </Grid>
              <Grid item>
                <Button style={{ marginRight: "20px" }} onClick={() => setOpen(!open)}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
