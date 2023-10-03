import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { Link, useNavigate } from "react-router-dom";
import Loader1 from "../components/loaders/Loader1";
import { toast } from "react-toastify";

const LoginPage = () => {
  // Define state variables to hold user input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to your backend for user login using Axios
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoading(false);

      if (response.status === 200) {
        toast.success("Login Successfully!");
        // You can redirect the user to another page or perform other actions
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        setLoading(false);
      } else {
        setErrorMessage("An error occurred while logging in.");
        setLoading(false);
      }
    }
  };
  if (loading) {
    return <Loader1></Loader1>;
  }

  return (
    <div className="container">
      <h2 className="my-5">Login Page</h2>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        Create Account ? <Link to="/register">register</Link>
        <div>
          <button type="submit" className="btn btn-primary mt-2 px-5">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
