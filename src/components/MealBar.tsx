import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { height } from "@mui/system";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";

const meals = [
  "Mittagsmenüs",
  "Supen",
  "Vorspeisen",
  "Salate",
  "Spezialitäten",
  "Schweinefleisch",
  "Hühnerfleisch",
  "Rindfleisch",
  "Ente",
  "Fisch",
  "Tintenfisch",
  "Hummerkrabben",
  "Gemüse",
  "Reis",
  "Nudeln",
  "Menüs",
  "Sushi",
  "Extras",
  "Nachspeisen",
  "Getränke",
];

const drawerWidth = 240;

export default function MealBar() {
  const initMeals = () => {
    return (
      <>
        {meals.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </>
    );
  };

  return (
    <div>
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
        <List>{initMeals()}</List>
      </Drawer>
    </div>
  );
}
