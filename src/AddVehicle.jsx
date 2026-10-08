
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function AddVehicle() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicle_number: "",
    vehicle_name: "",
    vehicle_type: "",
    brand: "",
    model: "",
    price_per_day: "",
    status: "Available"
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const vehicleData = {
        vehicle_number: formData.vehicle_number,
        vehicle_name: formData.vehicle_name,
        vehicle_type: formData.vehicle_type,
        brand: formData.brand,
        model: formData.model,
        price_per_day: Number(formData.price_per_day),
        status: formData.status
      };

      // Send data to FastAPI
      await axios.post(
        `${API_URL}/vehicles/`,
        vehicleData
      );

      alert("Vehicle added successfully!");

      // Go to Vehicles page
      navigate("/vehicles");

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(
          error.response.data.detail ||
          "Failed to add vehicle"
        );
      } else {
        alert(
          "Unable to connect to the backend."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-vehicle-page">

      <h1>Add Vehicle</h1>

      <p>
        Add a new vehicle to the Vehicle Management System.
      </p>

      <form
        className="vehicle-form"
        onSubmit={handleSubmit}
      >

        {/* Vehicle Number */}
        <div className="form-group">

          <label>
            Vehicle Number
          </label>

          <input
            type="text"
            name="vehicle_number"
            placeholder="Enter vehicle number"
            value={formData.vehicle_number}
            onChange={handleChange}
            required
          />

        </div>

        {/* Vehicle Name */}
        <div className="form-group">

          <label>
            Vehicle Name
          </label>

          <input
            type="text"
            name="vehicle_name"
            placeholder="Enter vehicle name"
            value={formData.vehicle_name}
            onChange={handleChange}
            required
          />

        </div>

        {/* Vehicle Type */}
        <div className="form-group">

          <label>
            Vehicle Type
          </label>

          <select
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
            required
          >

            <option value="">
              Select vehicle type
            </option>

            <option value="Car">
              Car
            </option>

            <option value="Bike">
              Bike
            </option>

            <option value="Van">
              Van
            </option>

            <option value="Truck">
              Truck
            </option>

            <option value="Bus">
              Bus
            </option>

          </select>

        </div>

        {/* Brand */}
        <div className="form-group">

          <label>
            Brand
          </label>

          <input
            type="text"
            name="brand"
            placeholder="Enter vehicle brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />

        </div>

        {/* Model */}
        <div className="form-group">

          <label>
            Model
          </label>

          <input
            type="text"
            name="model"
            placeholder="Enter vehicle model"
            value={formData.model}
            onChange={handleChange}
            required
          />

        </div>

        {/* Price Per Day */}
        <div className="form-group">

          <label>
            Price Per Day
          </label>

          <input
            type="number"
            name="price_per_day"
            placeholder="Enter price per day"
            min="0"
            value={formData.price_per_day}
            onChange={handleChange}
            required
          />

        </div>

        {/* Status */}
        <div className="form-group">

          <label>
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >

            <option value="Available">
              Available
            </option>

            <option value="Rented">
              Rented
            </option>

            <option value="Maintenance">
              Maintenance
            </option>

          </select>

        </div>

        {/* Buttons */}
        <div className="form-buttons">

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/vehicles")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="add-vehicle-btn"
            disabled={loading}
          >

            {loading ? "Adding..." : "Add Vehicle"}

          </button>

        </div>

      </form>

    </div>
  );
}

export default AddVehicle;
