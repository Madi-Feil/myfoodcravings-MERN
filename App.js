import DisplayAllRecipes from "./components/DisplayAllRecipes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import CreateRecipe from "./components/CreateRecipe";
import DisplayOneRecipe from "./components/DisplayOneRecipe";
import EditRecipe from "./components/EditRecipe";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayAllRecipes />} />
          <Route path="/recipe/new" element={<CreateRecipe />} />
          <Route path="/view/:id" element={<DisplayOneRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;