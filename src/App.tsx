import * as React from "react";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import AppBar from "./components/CustomAppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MealOverview } from "./pages/MealOverview";
import PageWrapper from "./components/PageWrapper";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import { Meal } from "./model";
import { MealContext } from "./components/context/mealContext";

function App() {
  const [mealContext, setMealContext] = React.useState<Meal[]>([]);
  return (
    <MealContext.Provider value={[mealContext, setMealContext]}>
      <div className="App">
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
          </Routes>
        </BrowserRouter>
      </div>
    </MealContext.Provider>
  );
}

export default App;
