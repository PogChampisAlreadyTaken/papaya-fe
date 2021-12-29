import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import * as React from "react";
import { Meal } from "../../model";
import { Category } from "../../model/category";
import {
  deleteMeal,
  getAllCategories,
  getAllMeals,
} from "../../request/mealManager";
import DeleteIcon from "@mui/icons-material/Delete";
import { MealContext } from "../context/mealContext";

type Props = {};

export function ShowMealsComponent(props: Props) {
  //states for showMeal-functionality
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedMenu, setselectedMenu] = React.useState<number>(0);
  const [meals, setMeals] = React.useContext(MealContext);
  const [filteredMeals, setfilteredMeals] = React.useState<Meal[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setselectedMenu(Number(event.target.value));
  };

  React.useEffect(() => {
    updateMeals();
    filteredMeals.sort();
  }, []);

  React.useEffect(() => {
    setfilteredMeals(meals.filter((meal) => meal.categoryid == selectedMenu));
    filteredMeals.sort();
  }, [selectedMenu, meals]);

  function updateMeals() {
    getAllCategories()
      .then(setCategories)
      .catch((error) => console.log(error));
    getAllMeals()
      .then(setMeals)
      .catch((error) => console.log(error));
  }

  function initDeleteRequest(meal: Meal) {
    deleteMeal(meal).then(() => {
      updateMeals();
    });
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
            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
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
      </>
    );
  }

  function showSelectedMeals() {
    return (
      <>
        <TableContainer id="mealcontainer" sx={{ minWidth: 650, height: 600 }}>
          <Table sx={{ minWidth: 650, height: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Del</TableCell>
                <TableCell>Gericht</TableCell>
                <TableCell align="right">MenuID</TableCell>
                <TableCell align="right">Schärfe</TableCell>
                <TableCell align="right">Preis</TableCell>
                <TableCell align="right">Bezeichnung</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMeals.map((meal) => (
                <TableRow
                  key={meal.menuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Button
                      onClick={() => {
                        initDeleteRequest(meal);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {meal.mealName}
                  </TableCell>
                  <TableCell align="right">{meal.menuid}</TableCell>
                  <TableCell align="right">{meal.hotness}</TableCell>
                  <TableCell align="right">{meal.price} €</TableCell>
                  <TableCell align="right">{meal.ingredients}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }

  return (
    <>
      {dropdownMenu()}
      {showSelectedMeals()}
    </>
  );
}
