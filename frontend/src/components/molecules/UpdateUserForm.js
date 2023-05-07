import { useState } from "react";
import axiosDefault from "setup/axios/defaultInstance";
import { ENDPOINTS } from "utils/consts";
import { Grid } from "@material-ui/core";
import { Box, Button, TextField, Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function UpdateUserForm(props) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
    };
    axiosDefault.patch(ENDPOINTS.users, data).then((response) => {
      window.location.reload(true);
    });
    setOpen(false);
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
                <TextField required id="first_name" name="first_name" label="First Name" />
              </Grid>
              <Grid item>
                <TextField required id="last_name" name="last_name" label="Last Name" />
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
