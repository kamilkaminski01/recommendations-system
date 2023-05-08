import { useEffect, useState } from "react";
import axiosDefault from "setup/axios/defaultInstance";
import { ENDPOINTS } from "utils/consts";
import { Grid } from "@material-ui/core";
import { Box, Button, TextField, Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function UpdateUserForm() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    axiosDefault.get(ENDPOINTS.userDetails).then((response) => {
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
    };
    axiosDefault.patch(ENDPOINTS.users, data).then(() => {
      window.location.reload(true);
      setOpen(false);
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(!open)}>
        Edit
      </Button>
      <Dialog open={open} onClose={() => setOpen(!open)} fullWidth>
        <DialogTitle>Edit your account</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <TextField
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>
              <Grid item>
                <Button style={{ marginRight: "20px" }} onClick={() => setOpen(!open)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
