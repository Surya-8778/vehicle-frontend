
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/vehicles/`)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const totalVehicles = vehicles.length;

  const petrolVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.fuel_type?.toLowerCase() === "petrol"
  ).length;

  const dieselVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.fuel_type?.toLowerCase() === "diesel"
  ).length;

  return (
    <div>
      <h1>Dashboard</h1>

      <p className="welcome">
        Welcome to Vehicle Management System 👋
      </p>

      <div className="cards">
        <div className="card">
          <h3>Total Vehicles</h3>
          <h2>{totalVehicles}</h2>
        </div>

        <div className="card">
          <h3>Petrol</h3>
          <h2>{petrolVehicles}</h2>
        </div>

        <div className="card">
          <h3>Diesel</h3>
          <h2>{dieselVehicles}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
