import "./App.css";
import { Homepage } from "./pages/Homepage";
import AppBar from "./components/CustomAppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MealOverview } from "./pages/MealOverview";
import ResponsiveDrawer from "./components/ResponsiveDrawer";

function App() {
  return (
    <div className="App">
      <ResponsiveDrawer />
      <BrowserRouter>
        <Routes>
          <Route path="hello" element={<Homepage />} />
          <Route path="meals" element={<MealOverview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
