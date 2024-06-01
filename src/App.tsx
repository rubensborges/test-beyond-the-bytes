import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NewAddress from "./pages/newAddress";
import Home from "./pages/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-address" element={<NewAddress />} />
          <Route path="/edit" element={<NewAddress />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
