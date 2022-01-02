import React from "react";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const meals = ["Warenkorb"];

export default function Basket() {
  const classes = useStyles();
  const initMeals = () => {
    return (
      <>
        {meals.map((s) => {
          return (
            <div>
              <Button>{s}</Button>
            </div>
          );
        })}{" "}
      </>
    );
  };
  return (
    <div style={{ backgroundColor: "#2d3134f2" }}>
      <Drawer
        anchor="right"
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        open
      >
        {initMeals()}
      </Drawer>
    </div>
  );
}

const useStyles = makeStyles({
  drawerPaper: {
    backgroundColor: "#2d3134f2!important",
  },
});
