import { Card } from "@mui/material";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function SendOrderComponent() {
  const classes = useStyles();

  return <Card className={classes.root}>Vielen Dank für Ihre Bestellung!</Card>;
}

const useStyles = makeStyles({
  root: {
    width: "50%",
    marginLeft: "25%",
    marginTop: "10%",
    marginBottom: "5%",
  },
  accordionRoot: {
    color: "white!important",
    backgroundColor: "#2d3134f2!important",
  },
});
