import { Card } from "@mui/material";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function SendOrderComponent() {
const classes = useStyles();
  
  return <Card className={classes.root}>Vielen Dank für Ihre Bestellung</Card>;
}


const useStyles = makeStyles({
  root: {
    width: "50%",
    marginLeft: "10%",
    marginTop: "5%",
    marginBottom: "5%",
  },
});
