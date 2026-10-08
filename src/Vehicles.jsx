
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Vehicles() {

  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  const getVehicles = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/vehicles/`
      );

      setVehicles(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    getVehicles();

  }, []);

  const deleteVehicle = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `${API_URL}/vehicles/${id}`
      );

      alert("Vehicle deleted successfully");

      getVehicles();

    } catch (error) {

      console.log(error);

      alert("Unable to delete vehicle");

    }

  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicle_number
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="page-header">

        <div>
          <h1>Vehicles</h1>
          <p>Manage all registered vehicles</p>
        </div>

        <Link
          to="/add-vehicle"
          className="add-button"
        >
          + Add Vehicle
        </Link>

      </div>

      <input
        className="search"
        type="text"
        placeholder="🔍 Search vehicle number..."
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Vehicle Number</th>
              <th>Model</th>
              <th>Owner</th>
              <th>Fuel</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredVehicles.map((vehicle) => (

              <tr key={vehicle.id}>

                <td>{vehicle.id}</td>

                <td>
                  {vehicle.vehicle_number}
                </td>

                <td>
                  {vehicle.vehicle_model}
                </td>

                <td>
                  {vehicle.owner_name}
                </td>

                <td>
                  <span className="fuel">
                    {vehicle.fuel_type}
                  </span>
                </td>

                <td>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteVehicle(vehicle.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {filteredVehicles.length === 0 && (
          <p className="no-data">
            No vehicles found.
          </p>
        )}

      </div>

    </div>
  );
}

export default Vehicles;
