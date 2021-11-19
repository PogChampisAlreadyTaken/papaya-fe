import "./App.css";
import { Homepage } from "./pages/Homepage";
import AppBar from "./components/CustomAppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MealOverview } from "./pages/MealOverview";
import MealBar from "./components/MealBar";

function App() {
  return (
    <div className="App">
      <AppBar />
      <MealBar />
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
