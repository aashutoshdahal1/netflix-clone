import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import Search from "./pages/Search/Search";
import Browse from "./pages/Browse/Browse";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { auth } from "./firebase";
const App = () => {
  const navigate = useNavigate();
  // Removed authentication requirement - users can browse without logging in
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       console.log("Logged In");
  //       navigate("/");
  //     } else {
  //       console.log("Logged Out");
  //       navigate("/login");
  //     }
  //   });
  // }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/browse/:type" element={<Browse />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/player/:type/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
