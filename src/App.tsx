import "./App.css";
import { Homepage } from "./pages/Homepage";
import AppBar from "./components/CustomAppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MealOverview } from "./pages/MealOverview";
import PageWrapper from "./components/PageWrapper";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
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
  );
}

export default App;
