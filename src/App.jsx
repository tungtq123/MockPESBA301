import { Route, Routes } from "react-router";
import "./App.css";
import ShopList from "./pages/ShopList";
import ShopDetail from "./pages/ShopDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ShopList />} />
        <Route path="/shops/:id" element={<ShopDetail />} />
      </Routes>
    </>
  );
}

export default App;
