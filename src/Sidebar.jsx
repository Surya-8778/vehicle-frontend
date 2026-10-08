import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <aside className="sidebar">

      <h3>Menu</h3>

      <Link to="/dashboard">
        🏠 Dashboard
      </Link>

      <Link to="/vehicles">
        🚗 Vehicles
      </Link>

      <Link to="/add-vehicle">
        ➕ Add Vehicle
      </Link>

      <Link to="/signin">
        🔐 Sign In
      </Link>

      <button
        onClick={handleSignOut}
        className="sidebar-signout"
      >
        🚪 Sign Out
      </button>

    </aside>
  );
}

export default Sidebar;