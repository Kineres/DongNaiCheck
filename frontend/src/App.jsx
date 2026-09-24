import { Routes, Route } from "react-router-dom";

import Places from "./pages/Places";
import DongNai from "./pages/DongNai";
import Areas from "./pages/Area";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Places />} />
        <Route path="/places" element={<Places />} />
        <Route path="/dong-nai" element={<DongNai />} />
        <Route path="/khu-vuc" element={<Areas />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;