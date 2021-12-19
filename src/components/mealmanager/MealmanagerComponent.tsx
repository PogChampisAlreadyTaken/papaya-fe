// @flow
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import {
  Typography,
  ListItemButton,
  ListItemText,
  Collapse,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import * as React from "react";
import { Meal } from "../../model";
import { Category } from "../../model/category";
import {
  getAllCategories,
  getAllMeals,
  postMeal,
} from "../../request/mealManager";
import { height, width } from "@mui/system";
import { ShowMealsComponent } from "./ShowMealsComponent";
import { MealContext } from "../context/mealContext";

type Props = {};

export function MealmanagerComponent(props: Props) {
  //states for Addmeal-functionality
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedMenu, setselectedMenu] = React.useState<number>(0);
  const [meals, setMeals] = React.useContext(MealContext);
  const [filteredMeals, setfilteredMeals] = React.useState<Meal[]>([]);
  const [open, setOpen] = React.useState(false);
  const [menuid, setMenuid] = React.useState("");
  const [hotness, setHotness] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [mealName, setMealName] = React.useState("");

  React.useEffect(() => {
    getAllCategories().then(setCategories);
    getAllMeals().then(setMeals);
  }, []);

  React.useEffect(() => {
    getAllMeals().then(setMeals);
    setfilteredMeals(meals.filter((meal) => meal.categoryid == selectedMenu));
  }, [selectedMenu]);

  const handleChange = (event: SelectChangeEvent) => {
    setselectedMenu(Number(event.target.value));
  };

  function dropdownMenu() {
    return (
      <>
        <FormControl style={{ width: 200 }}>
          <InputLabel id="selected-menu-label">Menü</InputLabel>
          <Select
            labelId="selected-menu-label"
            id="selected-menu"
            value={String(selectedMenu)}
            label="Menü"
            onChange={handleChange}
            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }} //important to overide the Parent values from paper
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          style={{
            height: document.getElementById("price")?.clientHeight,
            width: "150px",
          }}
          onClick={() => createMeal()}
        >
          Hinzufügen
        </Button>
      </>
    );
  }

  function createMeal() {
    let meal: Meal = {
      categoryid: Number(selectedMenu),
      mealName: mealName,
      price: Number(price),
      ingredients: ingredients,
      hotness: hotness,
      menuid: menuid,
    };

    postMeal(meal)
      .then((response) => cleanAddFields(response))
      .catch((error) => console.log(console.error(error)));
  }

  function cleanAddFields(respone: Response) {
    setMenuid("");
    setMealName("");
    setPrice("");
    setIngredients("");
    setHotness("");
    setMenuid("");
    setselectedMenu(0);
  }

  function validateMenuIdHelperText(): string {
    let helperText = "";

    if (filteredMeals.length === 0) {
      helperText = "Bitte vorher Menü auswählen";
    }

    if (filteredMeals.filter((meal) => meal.menuid == menuid).length > 0) {
      helperText = "MenüID bereits vergeben";
    }

    let valueMenuid = menuid.match(/\d+/g);
    if (valueMenuid == null && menuid != "") {
      helperText = "Buchstaben nicht erlaubt";
    }

    return helperText;
  }

  function validatePrice(): boolean {
    if (price.indexOf(".") < 3) {
      return false;
    }
    return true;
  }

  function mealInputBoxes() {
    return (
      <>
        <TextField
          id="menuid"
          label="Menuid"
          variant="outlined"
          value={menuid}
          onChange={(menuId) => {
            setMenuid(menuId.currentTarget.value);
          }}
          error={
            filteredMeals.length === 0 ||
            filteredMeals.filter((meal) => meal.menuid == menuid).length > 0
          }
          helperText={validateMenuIdHelperText()}
        />
        <TextField
          id="mealname"
          label="Name"
          variant="outlined"
          value={mealName}
          onChange={(mealName) => {
            setMealName(mealName.currentTarget.value);
          }}
        />
        <TextField
          id="price"
          label="Preis - €"
          variant="outlined"
          value={price === "" ? "" : price}
          onChange={(price) => {
            let dummyPrice = price.currentTarget.value.replace(",", ".");
            setPrice(dummyPrice);
          }}
          error={validatePrice()}
        />
        <TextField
          id="ingredients"
          label="Beschreibung"
          multiline
          variant="outlined"
          value={ingredients}
          onChange={(ingredients) => {
            setIngredients(ingredients.currentTarget.value);
          }}
        />
        <FormControl>
          <InputLabel id="Schärfe">Schärfe </InputLabel>
          <Select
            value={hotness}
            label="Age"
            onChange={(value) => {
              setHotness(value.target.value);
            }}
            style={{
              height: document.getElementById("price")?.clientHeight,
              width: "150px",
            }}
          >
            <MenuItem value={"(mild)"}>mild</MenuItem>
            <MenuItem value={"(leicht-scharf)"}>leicht-scharf</MenuItem>
            <MenuItem value={"(scharf)"}>scharf</MenuItem>
          </Select>
        </FormControl>
      </>
    );
  }
  //final Page
  return (
    <div style={{ height: "200px" }}>
      <Typography style={{ margin: "10px" }}>Gericht hinzufügen</Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {mealInputBoxes()}
        {dropdownMenu()}
      </div>
      <ShowMealsComponent></ShowMealsComponent>
    </div>
  );
}
