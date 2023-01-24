import { List, ListItemText, Typography, Grid, ListItem } from "@mui/material";
import React from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import BackButtonComponents from "../components/BackButtonComponents";

export default function ProfilePage() {
  const API_URL = "http://localhost:8000/api/";

  const [dataProvider, setDataProvider] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const userId = localStorage.getItem("user_id");
  React.useEffect(
    () => {
      axios.get(API_URL + "users/details/" + userId + "/").then((response) => {
        setDataProvider(response.data);
        setLoading(false);
      });
    },
    userId,
    [],
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  console.log(dataProvider);

  return (
    <Paper elevation={5}>
      <div className="container px-4 px-lg-5 mt-5 mb-5">
        <Grid container spacing={3}>
          <Grid item className="pt-1">
            <Typography variant="h4">Twoje dane:</Typography>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography
                      className="list-item-title"
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2">
                      {"Imię"}
                    </Typography>
                  }
                  secondary={<h6>{dataProvider.first_name}</h6>}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography
                      className="list-item-title"
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2">
                      {"Naziwsko:"}
                    </Typography>
                  }
                  secondary={<h6>{dataProvider.last_name}</h6>}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography
                      className="list-item-title"
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2">
                      {"Email"}
                    </Typography>
                  }
                  secondary={<h6>{dataProvider.email}</h6>}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography
                      className="list-item-title"
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2">
                      {"Aktualne punkty"}
                    </Typography>
                  }
                  secondary={<h6>{dataProvider.current_points}</h6>}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography
                      className="list-item-title"
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2">
                      {"Punkty zaufania"}
                    </Typography>
                  }
                  secondary={<h6>{dataProvider.credibility}</h6>}
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <BackButtonComponents />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}
