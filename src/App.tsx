import * as React from "react";
import { Homepage } from "./pages/Homepage";
import AppBar from "./components/CustomAppBar";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { MealOverview } from "./pages/MealOverview";
import PageWrapper from "./components/PageWrapper";
import Dashboard from "./pages/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import { Address, Customer, Meal, Order } from "./model";
import { MealContext } from "./components/context/mealContext";
import { OverlayContext } from "./components/context/overlayContext";
import { MealmanagerComponent } from "./components/mealmanager/MealmanagerComponent";
import { CustomerContext } from "./components/context/customerContext";
import { auth } from "./config/Firebase-config";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "./keycloak";
import AdminRoute from "./helpers/PrivateRoute";
import Reservation from "./components/Reservation";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { de } from "date-fns/locale";
import TimemanagerComponent from "./components/usermanagement/TimemanagerComponent";
import DeliverAreaComponent from "./components/usermanagement/DeliverAreaComponent";
import { OrderContext } from "./components/context/orderContext";
import Basket from "./components/Basket";
import OrderViewComponent from "./components/orderingsystem/OrderViewComponent";
import { useLocalStorage } from "./helpers/useLocalStorage";
import { AddressContext } from "./components/context/addressContext";
import { getAddress, getUser } from "./request/userManagement";
import OrderHistory from "./pages/OrderHistory";
import SendOrderComponent from "./components/orderingsystem/SendOrderComponent";


function App() {
  const classes = useStyles();
  const [orderContext, setOrderContext] = useLocalStorage<Order>("order", {
    shoppingItem: [],
  });
  const [mealContext, setMealContext] = React.useState<Meal[]>([]);
  const [overlayContext, setOverlayContext] = React.useState({
    open: false,
    message: "",
    openMessage: false,
  });
  const [customerContext, setCustomerContext] = React.useState<
    Customer | undefined
  >(undefined);

  const eventLogger = (event: unknown, error: unknown) => {
    if (event === "onAuthSuccess") {
      if (keycloak.subject) {
        const response = getUser(keycloak.subject).then((user) => {
          if (user != undefined) {
            getAddress(user.customer_address_id).then((address) => {
              user.address = address;
              setCustomerContext(user);
            });
          }
        });
      }
    }
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={eventLogger}
      initOptions={{ checkLoginIframe: true }}
    >
      <CustomerContext.Provider value={[customerContext, setCustomerContext]}>
        <MealContext.Provider value={[mealContext, setMealContext]}>
          <OverlayContext.Provider value={[overlayContext, setOverlayContext]}>
            <OrderContext.Provider value={[orderContext, setOrderContext]}>
              <div className={classes.app}>
                <BrowserRouter>
                  <AppBar />
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={de}
                  >
                    <Routes>
                      <Route
                        path="hello"
                        element={
                          <PageWrapper>
                            <Homepage />
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="orderhistory"
                        element={
                          <PageWrapper>
                            <OrderHistory />
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="dashboard"
                        element={
                          <PageWrapper>
                            <Dashboard />
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="/"
                        element={
                          <PageWrapper>
                            <div className={classes.flex}>
                              <MealOverview />
                              <Basket />
                            </div>
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="meals"
                        element={
                          <PageWrapper>
                            <MealOverview />
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="reservation"
                        element={
                          <PageWrapper>
                            <Reservation />
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="mealmanager"
                        element={
                          <PageWrapper>
                            <AdminRoute>
                              <MealmanagerComponent />
                            </AdminRoute>
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="timemanager"
                        element={
                          <PageWrapper>
                            <AdminRoute>
                              <TimemanagerComponent />
                            </AdminRoute>
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="delivermanager"
                        element={
                          <PageWrapper>
                            <AdminRoute>
                              <DeliverAreaComponent />
                            </AdminRoute>
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="ordermanager"
                        element={
                          <PageWrapper>
                            <div className={classes.flex}>
                              <OrderViewComponent />
                              <Basket />
                            </div>
                          </PageWrapper>
                        }
                      />
                      <Route
                        path="sendorder"
                        element={
                          <PageWrapper>
                            <SendOrderComponent />
                          </PageWrapper>
                        }
                      />
                    </Routes>
                  </LocalizationProvider>
                </BrowserRouter>
              </div>
            </OrderContext.Provider>
          </OverlayContext.Provider>
        </MealContext.Provider>
      </CustomerContext.Provider>
    </ReactKeycloakProvider>
  );
}

export default App;

const useStyles = makeStyles({
  app: {
    height: "100vh",
    width: "100vw",
    textAlign: "center",
    backgroundColor: "#000000",
    backgroundImage: `url(${"background.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  flex: {
    display: "flex",
    padding: "10px",
  },
});
