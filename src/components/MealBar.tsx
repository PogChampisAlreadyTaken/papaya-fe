import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";

const meals = [
  "Mittagsmenüs",
  "Suppen",
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
