import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmConstrucao from "./pages/EmConstrucao";
import OneImpact from "./pages/OneImpact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmConstrucao />} />
        <Route path="/inicio-one" element={<OneImpact />} />
      </Routes>
    </BrowserRouter>
  );
}
