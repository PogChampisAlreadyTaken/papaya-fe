import * as React from "react";
import { Homepage } from "./pages/Homepage";
import AppBar from "./components/CustomAppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MealOverview } from "./pages/MealOverview";
import PageWrapper from "./components/PageWrapper";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import { Meal } from "./model";
import { MealContext } from "./components/context/mealContext";
import { MealmanagerComponent } from "./components/mealmanager/MealmanagerComponent";

function App() {
  const classes = useStyles();
  const [mealContext, setMealContext] = React.useState<Meal[]>([]);
  return (
    <MealContext.Provider value={[mealContext, setMealContext]}>
      <div className={classes.app}>
        <AppBar />
        <BrowserRouter>
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
                  <Dashboard />
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
              path="admin"
              element={
                <PageWrapper>
                  <AdminPanel />
                </PageWrapper>
              }
            />
            <Route
              path="mealmanager"
              element={
                <PageWrapper>
                  <MealmanagerComponent />
                </PageWrapper>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </MealContext.Provider>
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
