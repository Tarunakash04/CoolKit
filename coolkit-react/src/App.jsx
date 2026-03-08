import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ClubWorkspace from "./pages/ClubWorkspace";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/club/:id" element={<ClubWorkspace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;