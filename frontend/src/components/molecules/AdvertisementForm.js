import { useState } from "react";
import { ENDPOINTS } from "utils/consts";
import axiosDefault from "setup/axios/defaultInstance";
import { Grid } from "@material-ui/core";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";

export default function AdvertisementForm() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      reward_for_approval: formData.get("reward_for_approval"),
      type,
    };
    axiosDefault.post(ENDPOINTS.advertisements, data).then(() => {
      window.location.reload(true);
      setOpen(false);
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(!open)}>
        Create an add
      </Button>
      <Dialog open={open} onClose={() => setOpen(!open)} fullWidth>
        <DialogTitle>Create your advertisement</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container direction={"column"} spacing={2}>
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
              <Grid item>
                <FormControl style={{ minWidth: "195px" }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    label="Type"
                    labelId="type"
                    id="type"
                    value={type}
                    required
                    onChange={(event) => setType(event.target.value)}>
                    <MenuItem value="RECRUITMENT">Recruitment</MenuItem>
                    <MenuItem value="COMMERCIAL">Commercial</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item style={{ alignItems: "right" }}>
                <Button
                  style={{ marginRight: "20px" }}
                  onClick={() => setOpen(!open)}
                  variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
