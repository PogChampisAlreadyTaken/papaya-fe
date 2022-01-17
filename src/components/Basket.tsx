import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Card, IconButton, TableContainer } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Remove, Add } from "@mui/icons-material";
import { ShoppingItem } from "../model/shoppingItem";
import { makeStyles } from "@material-ui/core/styles";
import { OrderContext } from "./context/orderContext";
import { display } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { getAddress, getUser } from "../request/userManagement";
import { CustomerContext } from "./context/customerContext";
import { useKeycloak } from "@react-keycloak/web";

export default function Basket() {
  const [orderContext, setOrderContext] = React.useContext(OrderContext);
  const [customer, setCustomer] = React.useContext(CustomerContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();

  React.useEffect(() => {}, [orderContext]);

  const deleteMeal = (shoppingItem: ShoppingItem) => {
    const index = orderContext.shoppingItem.indexOf(shoppingItem);
    if (index > -1) {
      orderContext.shoppingItem.splice(index, 1);
    }

    const updatedOrderContext = {
      ...orderContext,
      shoppingItem: [...orderContext.shoppingItem],
    };
    setOrderContext(updatedOrderContext);
  };

  const minusMeal = (shoppingItem: ShoppingItem) => {
    const item: ShoppingItem = {
      meal: shoppingItem.meal,
      amount: shoppingItem.amount--,
    };

    if (item.amount <= 1) {
      deleteMeal(shoppingItem);
    } else {
      const updatedOrderContext = {
        ...orderContext,
        shoppingItem: [...orderContext.shoppingItem],
      };

      setOrderContext(updatedOrderContext);
    }
  };

  const plusMeal = (shoppingItem: ShoppingItem) => {
    const item: ShoppingItem = {
      meal: shoppingItem.meal,
      amount: shoppingItem.amount++,
    };

    const updatedOrderContext = {
      ...orderContext,
      shoppingItem: [...orderContext.shoppingItem],
    };

    setOrderContext(updatedOrderContext);
  };

  return (
    <>
      <Card className={classes.root}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100, minHeight: 400 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Nr.</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Anzahl</TableCell>
                <TableCell
                  align="right"
                  className={classes.buttons}
                ></TableCell>
                <TableCell align="right">Einzelpreis</TableCell>
                <TableCell align="right">Gesamtpreis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderContext.shoppingItem.map((meals, index) => {
                return (
                  <TableRow
                    key={meals.meal.menuid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {meals.meal.menuid}
                    </TableCell>
                    <TableCell align="right">{meals.meal.mealName}</TableCell>
                    <TableCell align="right">{meals.amount}</TableCell>
                    <TableCell align="right" className={classes.buttons}>
                      {
                        <>
                          <IconButton
                            onClick={() => {
                              minusMeal(meals);
                            }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              deleteMeal(meals);
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              plusMeal(meals);
                            }}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </>
                      }
                    </TableCell>
                    <TableCell align="right">{meals.meal.price}</TableCell>
                    <TableCell align="right">
                      {(meals.meal.price * meals.amount).toFixed(2)+ "€"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          onClick={() => {
            if (!keycloak.authenticated) {
              const response = getUser(keycloak.subject).then((user) => {
                getAddress(user.customer_address_id).then((address) => {
                  user.address = address;
                  setCustomer(user);
                });
              });
            }
            navigate("/ordermanager");
          }}
        >
          Weiter
        </Button>
      </Card>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    width: "50%",
    marginRight: "5%",
    marginTop: "5%",
    marginBottom: "5%",
    paddingLeft: "10px",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-start",
  },
});
