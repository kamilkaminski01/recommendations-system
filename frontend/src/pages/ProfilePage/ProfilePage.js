import React, { useEffect, useState } from "react";
import "./ProfilePage.scss";
import { List, ListItemText, Typography, Grid, ListItem } from "@mui/material";
import { ENDPOINTS } from "utils/consts";
import CandidatesTable from "components/molecules/CandidatesTable";
import AdvertisementForm from "components/molecules/AdvertisementForm";
import UpdateUserForm from "components/molecules/UpdateUserForm";
import axiosDefault from "setup/axios/defaultInstance";

export default function ProfilePage() {
  const [dataProvider, setDataProvider] = useState([]);
  const [isAdmin, SetIsAdmin] = useState();

  useEffect(() => {
    axiosDefault.get(ENDPOINTS.userDetails).then((response) => {
      setDataProvider(response.data);
      response.data.is_staff ? SetIsAdmin(true) : SetIsAdmin(false);
    });
  }, []);

  return (
    <div className="profile-container">
      <div className="container px-4 px-lg-5 mt-5 mb-5">
        <Grid container spacing={3}>
          <Grid item className="pt-1">
            <List>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography
                      className="list-item-title"
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2">
                      {"First Name"}
                    </Typography>
                  }
                  secondary={dataProvider.first_name}
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
                      {"Last Name"}
                    </Typography>
                  }
                  secondary={dataProvider.last_name}
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
                  secondary={dataProvider.email}
                />
              </ListItem>
              {isAdmin ? (
                <>
                  <CandidatesTable />
                </>
              ) : (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography
                          className="list-item-title"
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2">
                          {"Current Points"}
                        </Typography>
                      }
                      secondary={dataProvider.current_points}
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
                          {"Credibility"}
                        </Typography>
                      }
                      secondary={dataProvider.credibility}
                    />
                  </ListItem>
                </>
              )}
              <ListItem alignItems="flex-start">
                {isAdmin ? <AdvertisementForm /> : <></>}
                <UpdateUserForm />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
