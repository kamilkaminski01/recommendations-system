import React from "react";
import "./RedirectButton.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function RedirectButton(props) {
  return (
    <Button
      component={Link}
      onClick={props.onClick}
      to={{ pathname: props.url }}
      onChange={props.onChange}
      state={props.state}
      variant="contained"
      className="redirect-button">
      {props.name}
    </Button>
  );
}
