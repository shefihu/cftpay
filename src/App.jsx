import { Route, Routes } from "react-router-dom";
import "./App.css";
import Agreement from "./pages/Agreement";
import Offering from "./pages/Offering";
import Payment from "./pages/Payment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Offering />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
