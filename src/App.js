import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Create from "./screens/Create";
import AdminMain from "./screens/AdminMain";
import AdminClasses from "./screens/AdminClasses";
import AdminTrainers from "./screens/AdminTrainers";
import AdminClients from "./screens/AdminClients";
import ClientMain from "./screens/ClientMain";
import ClientClasses from "./screens/ClientClasses";
import ClientTrainers from "./screens/ClientTrainers";
import ClientSchedule from "./screens/ClientSchedule";


function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/adminMain" element={<AdminMain />} />
        <Route path="/adminClasses" element={<AdminClasses />} />
        <Route path="/adminTrainers" element={<AdminTrainers />} />
        <Route path="/adminClients" element={<AdminClients />} />
        <Route path="/clientMain" element={<ClientMain />} />
        <Route path="/clientClasses" element={<ClientClasses />} />
        <Route path="/clientTrainers" element={<ClientTrainers />} />
        <Route path="/clientSchedule" element={<ClientSchedule />} />
        
      </Routes>
    </Router>
   
  );
}

export default App;
