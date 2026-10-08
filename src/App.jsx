import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import SignIn from "./SignIn";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import Dashboard from "./Dashboard";
import Vehicles from "./Vehicles";
import AddVehicle from "./AddVehicle";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Sign In Page */}
        <Route path="/signin" element={<SignIn />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />

              <div className="main-layout">

                <Sidebar />

                <main className="content">
                  <Dashboard />
                </main>

              </div>
            </>
          }
        />

        {/* Vehicles */}
        <Route
          path="/vehicles"
          element={
            <>
              <Navbar />

              <div className="main-layout">

                <Sidebar />

                <main className="content">
                  <Vehicles />
                </main>

              </div>
            </>
          }
        />

        {/* Add Vehicle */}
        <Route
          path="/add-vehicle"
          element={
            <>
              <Navbar />

              <div className="main-layout">

                <Sidebar />

                <main className="content">
                  <AddVehicle />
                </main>

              </div>
            </>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;