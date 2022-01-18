// @flow
//@author Alois Roscher
import {
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  SelectChangeEvent,
  Snackbar,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import * as React from "react";
import { Meal } from "../../model";
import { Category } from "../../model/category";
import {
  getAllCategories,
  getAllMeals,
  postMeal,
} from "../../request/mealManager";
import { ShowMealsComponent } from "./ShowMealsComponent";
import { MealContext } from "../context/mealContext";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type Props = {};

export function MealmanagerComponent(props: Props) {
  //states for Addmeal-functionality
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedMenu, setselectedMenu] = React.useState<number>(0);
  const [meals, setMeals] = React.useContext(MealContext);
  const [filteredMeals, setfilteredMeals] = React.useState<Meal[]>([]);
  const [menuid, setMenuid] = React.useState("");
  const [hotness, setHotness] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [mealName, setMealName] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertError, setOpenAlertError] = React.useState(false);

  React.useEffect(() => {
    getAllCategories().then(setCategories);
    getAllMeals().then(setMeals);
  }, []);

  React.useEffect(() => {
    getAllMeals().then(setMeals);
    setfilteredMeals(meals.filter((meal) => meal.categoryid === selectedMenu));
  }, [selectedMenu]);

  const handleChange = (event: SelectChangeEvent) => {
    setselectedMenu(Number(event.target.value));
  };
  //change and alert constants needed for Snackbar Alert
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
    setOpenAlertError(false);
  };
  //helper functions
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
      .then((response) => {
        if (response.status === 201) {
          cleanAddFields(response);
          setOpenAlert(true);
        } else {
          setOpenAlertError(true);
        }
      })
      .catch((error) => console.error(error));
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

    if (menuid.length < 1) {
      helperText = "Bitte MenuID eingeben";
    }

    if (filteredMeals.length === 0) {
      helperText = "Bitte vorher Menü auswählen";
    }

    if (meals.filter((meal) => meal.menuid === menuid).length > 0) {
      helperText = "MenüID bereits vergeben";
    }

    let valueMenuid = menuid.match(/\d+/g);
    if (valueMenuid === null && menuid !== "") {
      helperText = "Buchstaben nicht erlaubt";
    }

    return helperText;
  }

  function validatePriceHelpertext(): string {
    let helperText = "";

    let result = /[a-zA-Z]+$/.test(price);
    if (result) {
      helperText = "Buchstaben nicht erlaubt";
    }

    if (price.indexOf(".") > 2) {
      helperText = "Nicht mehr als 2 Vorkommastellen";
    }
    if (price.indexOf(".") < 1 && price.length < 2) {
      helperText = "Bitte mindestens eine Zahl eingeben";
    }

    if (price.indexOf(".") === -1) {
      helperText = "Bitte Komma angeben";
    }

    return helperText;
  }

  function validateMealNameHelperText() {
    let helperText = "";
    if (mealName.length < 1) {
      helperText = "Bitte Namen eingeben";
    }
    return helperText;
  }

  function validatePrice(): boolean {
    let result = /[a-zA-Z]+$/.test(price);
    if (result || price.indexOf(".") === -1) {
      return true;
    }
    if (price.indexOf(".") < 2 && price.length < 2) {
      return true;
    }
    if (price.indexOf(".") < 3) {
      return false;
    }

    return true;
  }

  function validateMenuIdError() {
    if (
      filteredMeals.length === 0 ||
      meals.filter((meal) => meal.menuid === menuid).length > 0
    ) {
      return true;
    }
    if (menuid.length < 1) {
      return true;
    }
    // \d Metacharacter allows global search for digits
    let valueMenuid = menuid.match(/\d+/g);
    if (valueMenuid === null && menuid !== "") {
      return true;
    }

    return false;
  }

  function validateMenuName() {
    if (mealName.length < 1) {
      return true;
    }

    return false;
  }
  //functions that create the React-Elements
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
          error={validateMenuIdError()}
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
          error={validateMenuName()}
          helperText={validateMealNameHelperText()}
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
          helperText={validatePriceHelpertext()}
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
        <Stack>
          <Button
            variant="outlined"
            style={{
              height: document.getElementById("price")?.clientHeight,
              width: "150px",
            }}
            onClick={() => createMeal()}
            disabled={
              validateMenuIdError() || validatePrice() || validateMenuName()
            }
          >
            Hinzufügen
          </Button>
          <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Gericht erfolgreich Hinzugefügt
            </Alert>
          </Snackbar>
          <Snackbar
            open={openAlertError}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Fehler bei der Übertragung
            </Alert>
          </Snackbar>
        </Stack>
      </>
    );
  }

  //final Page
  return (
    <div style={{ height: "200px" }}>
      <Paper>
        <div style={{ height: "30px" }} />
        <Typography style={{ margin: "10px", fontSize: "30px" }}>
          Gerichte hinzufügen
        </Typography>
        <div style={{ height: "30px" }} />
        <Divider></Divider>
        <div style={{ height: "30px" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {mealInputBoxes()}
          {dropdownMenu()}
        </div>
        <Typography>Gerichte Anzeigen: </Typography>

        <ShowMealsComponent />
      </Paper>
    </div>
  );
}
