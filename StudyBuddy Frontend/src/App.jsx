import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/Landing";
import Login from "./Pages/login";
import Signup from "./Pages/Signup";
import Materialmenu from "./Pages/Materialmenu";
import { AnimatePresence } from "framer-motion";
import ProtectedAuth from "./Protected Routes/ProtectedAuth";
import EditMaterial from "./Modals/EditMaterial";
import ViewAllMaterials from "./Pages/ViewAllMaterials";
function App() {
  const location = useLocation();

  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("user")));
  //   console.log(user);
  // }, []);
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedAuth>
              <Signup />
            </ProtectedAuth>
          }
        />
        <Route path="/materials" element={<Materialmenu />} />
        <Route path="/materials/admin" element={<ViewAllMaterials />} />
        <Route path="/materials/:materialId" element={<EditMaterial />} />
        <Route
          path="*"
          element={
            <div>
              <h2 style={{ padding: "0 2ch" }}>
                Oops, seems like you have reach a non exsisting route !
              </h2>
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
