import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Shop from "@material-ui/icons/Shop";
import Star from "@material-ui/icons/Star";
import { RateReview } from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { Link } from "react-router-dom";

const CustomCard = (props) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ fontWeight: "bold" }}>
          {props.icon} {props.name}
        </Box>

        <Box>
          {props.desc}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Box>
      </CardContent>
      <CardActions>
        <Button component={Link} to={props.link} size="small">
          Przejdź
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles({
  root: {
    minHeight: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    height: "140px",
    width: "320px",
    alignItems: "center",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "15px",
    marginBottom: "15px",
  },
});

export default function UserMainPage() {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.root} alignItems="center" justifyContent="center" container>
        <Grid className={classes.row} alignItems="center" justifyContent="center">
          <Box className={classes.card}></Box>
          <Box className={classes.card}></Box>
          <Box className={classes.card}></Box>
          <Box className={classes.card}></Box>
        </Grid>
        <Grid className={classes.row} alignItems="center" justifyContent="center">
          <Box className={classes.card}></Box>
          <Box className={classes.card}>
            <CustomCard
              name="Ranking"
              link="/rank"
              icon={<Star color="primary" fontSize="large" />}
            />
          </Box>
          <Box className={classes.card}>
            <CustomCard
              name="Strona użytkownika"
              icon={<AccountCircle color="primary" fontSize="large" />}
              link="/profilePage"
            />
          </Box>
          <Box className={classes.card}></Box>
        </Grid>
        <Grid className={classes.row} alignItems="center" justifyContent="center">
          <Box className={classes.card}></Box>
          <Box className={classes.card}>
            <CustomCard
              name="Sklep "
              icon={<Shop color="primary" fontSize="large" />}
              link="/shop/rewards"
            />
          </Box>
          <Box className={classes.card}>
            <CustomCard
              name="Polecenia"
              icon={<RateReview color="primary" fontSize="large" />}
              link="/advertisements"
            />
          </Box>
          <Box className={classes.card}></Box>
        </Grid>
      </Grid>
    </>
  );
}
