import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const adminTools = [
  "Zeitmanagement",
  "Liefergebietverwaltung",
  "Gerichteverwaltung",
];

export default function AdminBar() {
  const initMeals = () => {
    return (
      <>
        {adminTools.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </>
    );
  };

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
