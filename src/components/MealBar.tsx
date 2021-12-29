import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@mui/material/ListItemText";
import { useHref, useNavigate } from "react-router";
import useQuery from "../config/queryParams";
import { useState } from "react";
import { getAllCategories } from "../request/mealManager";
import * as React from "react";
import { Category } from "../model/category";

const drawerWidth = 240;

export default function MealBar() {
  const navigate = useNavigate();
  const classes = useStyles();
  const query = useQuery();
  const [categories, setCategories] = useState<Category[]>([]);
  const initMeals = () => {
    return (
      <>
        {categories.map((category) => (
          <ListItem
            button
            selected={Number(query.get("id")) === category.id}
            divider
            classes={{ selected: classes.listItemSelected }}
            key={category.name}
            onClick={() => {
              navigate("?category=" + category.name + "&id=" + category.id);
            }}
          >
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </>
    );
  };

  React.useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            color: "white",
            backgroundColor: "#2d3134f2",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />

        <div style={{ overflow: "auto" }}>
          <List>{initMeals()}</List>
        </div>
      </Drawer>
    </div>
  );
}

const useStyles = makeStyles({
  listItemSelected: {
    backgroundColor: "#232325fc!important",
  },
});
