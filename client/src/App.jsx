import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </>
  );
};

export default App;
