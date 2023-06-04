import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import axiosDefault from "setup/axios/defaultInstance";
import { generatePath } from "react-router-dom";
import { ENDPOINTS } from "utils/consts";

export default function BuyForm(props) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    axiosDefault.get(ENDPOINTS.userDetails).then((response) => {
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      setCurrentPoints(response.data.current_points);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      shipping_address: formData.get("shipping_address"),
      reward: props.id,
    };
    axiosDefault.post(generatePath(ENDPOINTS.purchaseReward, { id: props.id }), data).then(() => {
      window.location.reload(true);
      setOpen(false);
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(!open)}>
        Buy now
      </Button>
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide your shipping address before buying this item
          </DialogContentText>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <TextField
                  required
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  value={firstName}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  value={lastName}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="shipping_address"
                  name="shipping_address"
                  label="Shipping Address"
                />
              </Grid>
              <Grid item>Your current points: {currentPoints}</Grid>
              {currentPoints >= props.cost ? (
                <Grid item>Your points after buying: {currentPoints - props.cost}</Grid>
              ) : (
                <Grid item>You don&apos;t have enough points to buy</Grid>
              )}
              <Grid item>
                <Button style={{ marginRight: "20px" }} onClick={() => setOpen(!open)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={currentPoints < props.cost}>
                  Buy
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
