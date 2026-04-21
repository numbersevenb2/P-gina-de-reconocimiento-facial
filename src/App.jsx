import { BrowserRouter, Routes, Route } from "react-router-dom";
import FaceLogin from "./components/FaceLogin";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FaceLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
