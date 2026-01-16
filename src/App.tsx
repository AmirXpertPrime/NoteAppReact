import React from "react";
import "./App.css";
import Home from "./pages/main/Home";
import AddNotes from "./pages/main/AddNotes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddNotes />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/add" element={<AddNotes />} /> */}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
