import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

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
  const query = useQuery();
  const [categories, setCategories] = useState<Category[]>([])
  const initMeals = () => {
    return (
      <>
        {categories.map((category) => (
          <ListItem
            button
            selected={Number(query.get("id")) === category.id}
            divider
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
  }, [])

  return (
    <div style={{ height: "100%" }}>
      <Drawer
        style={{ height: "100%" }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
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
