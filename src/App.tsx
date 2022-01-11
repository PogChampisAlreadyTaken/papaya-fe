import * as React from "react";
import { Homepage } from "./pages/Homepage";
import AppBar from "./components/CustomAppBar";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { MealOverview } from "./pages/MealOverview";
import PageWrapper from "./components/PageWrapper";
import Dashboard from "./pages/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import { Customer, Meal } from "./model";
import { MealContext } from "./components/context/mealContext";
import { OverlayContext } from "./components/context/overlayContext";
import { MealmanagerComponent } from "./components/mealmanager/MealmanagerComponent";
import { CustomerContext } from "./components/context/customerContext";
import { auth } from "./config/Firebase-config";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak, { onKeycloakEvent } from "./keycloak";
import AdminRoute from "./helpers/PrivateRoute";
import Reservation from "./components/Reservation";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { de } from "date-fns/locale";
import TimemanagerComponent from "./components/usermanagement/TimemanagerComponent";
import DeliverAreaComponent from "./components/usermanagement/DeliverAreaComponent";

function App() {
  const classes = useStyles();
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
    console.log("onKeycloakEvent", event, error);
  };

  const tokenLogger = (tokens: unknown) => {
    console.log("onKeycloakTokens", tokens);
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={onKeycloakEvent}
      onTokens={tokenLogger}
      initOptions={{ checkLoginIframe: true }}
    >
      <CustomerContext.Provider value={[customerContext, setCustomerContext]}>
        <MealContext.Provider value={[mealContext, setMealContext]}>
          <div className={classes.app}>
            <OverlayContext.Provider
              value={[overlayContext, setOverlayContext]}
            ></OverlayContext.Provider>
            <BrowserRouter>
              <OverlayContext.Provider
                value={[overlayContext, setOverlayContext]}
              >
                <AppBar />
              </OverlayContext.Provider>
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
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
                        <MealOverview />
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
                </Routes>
              </LocalizationProvider>
            </BrowserRouter>
          </div>
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
});
