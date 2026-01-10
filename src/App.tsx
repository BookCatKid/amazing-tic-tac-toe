import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { GamePage } from "@/pages/GamePage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:mode" element={<GamePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
