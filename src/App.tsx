import "./App.css";
import { Homepage } from "./pages/Homepage";
import AppBar from "./components/CustomAppBar";
import MealBar from "./components/MealBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MealOverview } from "./pages/MealOverview";

function App() {
  return (
    <div className="App">
      <AppBar />
      <MealBar />
      <BrowserRouter>
        <Routes>
          <Route path="/hello" element={<Homepage />} />
          <Route path="meals" element={<MealOverview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
