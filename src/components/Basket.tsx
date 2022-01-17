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
import { CustomerContext } from "./context/customerContext";
import { useKeycloak } from "@react-keycloak/web";

export default function Basket() {
  const [orderContext, setOrderContext] = React.useContext(OrderContext);
  const [customer, setCustomer] = React.useContext(CustomerContext);

  const [showButtonWeiter, setShowButtonWeiter] = React.useState<boolean>();
  const [orderPlacementTextBasket, setOrderPlacementTextBasket] = React.useState<String>();

  const classes = useStyles();
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();

  React.useEffect(() => {
    if(orderContext.shoppingItem.length==0){
      setShowButtonWeiter(true);
      setOrderPlacementTextBasket("Noch nichts im Warenkorb");
    }else{
      setShowButtonWeiter(false);
      setOrderPlacementTextBasket("Weiter");
    }
  }, [orderContext]);

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
      <Card className={classes.root} style={{ background: "#282c34f0" }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 100, minHeight: 400, background: "#282c34f0" }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                  Nr.
                </TableCell>
                <TableCell
                  style={{ color: "#fff", fontWeight: "bold" }}
                  align="left"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Anzahl
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.buttons}
                ></TableCell>
                <TableCell
                  style={{ color: "#fff", fontWeight: "bold" }}
                  align="right"
                >
                  Preis
                </TableCell>
                <TableCell
                  style={{ color: "#fff", fontWeight: "bold" }}
                  align="center"
                >
                  Gesamtpreis
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderContext.shoppingItem.map((meals, index) => {
                return (
                  <TableRow
                    key={meals.meal.menuid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{ color: "#fff" }}
                      component="th"
                      scope="row"
                    >
                      {meals.meal.menuid}
                    </TableCell>
                    <TableCell style={{ color: "#fff" }} align="left">
                      {meals.meal.mealName}
                    </TableCell>
                    <TableCell style={{ color: "#fff" }} align="center">
                      {meals.amount}
                    </TableCell>
                    <TableCell
                      style={{ color: "#fff" }}
                      align="right"
                      className={classes.buttons}
                    >
                      {
                        <>
                          <IconButton
                           style={{ color: "#fff" }}
                            onClick={() => {
                              minusMeal(meals);
                            }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <IconButton
                            style={{ color: "#fff" }}
                            onClick={() => {
                              deleteMeal(meals);
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                          <IconButton
                            style={{ color: "#fff" }}
                            onClick={() => {
                              plusMeal(meals);
                            }}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </>
                      }
                    </TableCell>
                    <TableCell style={{color: "#fff"}} align="right">{meals.meal.price}</TableCell>
                    <TableCell style={{color: "#fff"}} align="right">
                      {(meals.meal.price * meals.amount).toFixed(2) + "€"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          sx={{
            color: "white",
            borderColor: "white",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          variant="outlined"
          disabled={showButtonWeiter}
          onClick={() => {
            navigate("/ordermanager");
          }}
        >
          {orderPlacementTextBasket}
        </Button>
      </Card>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    width: "35%",
    marginRight: "5%",
    marginBottom: "80px",
    marginLeft: "5px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "10px",
    marginTop: "85px",
    background: "#282c34f0",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-start",
  },
});
