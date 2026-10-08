
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function SignIn() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!username || !email || !password) {
      setErrorMessage("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${API_URL}/register`,
        {
          username: username.trim(),
          email: email.trim(),
          password: password
        }
      );

      alert("Account created successfully!");

      navigate("/");

    } catch (error) {
      console.log(error);

      if (error.response) {
        setErrorMessage(
          error.response.data.detail ||
          "Registration failed"
        );
      } else {
        setErrorMessage(
          "Unable to connect to the backend"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          🚗
        </div>

        <h1>Create Account</h1>

        <p>
          Sign in to Vehicle Management System
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignIn}>

          <div className="form-group">

            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign In"}
          </button>

        </form>

        <p className="auth-link">

          Already have an account?{" "}

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default SignIn;
