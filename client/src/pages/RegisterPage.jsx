import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader1 from "../components/loaders/Loader1";
import { toast } from "react-toastify";

const RegisterPage = () => {
  // Define state variables to hold user input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length <= 3) {
      return setErrorMessage("Username must be 4 digit long");
    }
    if (username.length > 3) {
      const res = await axios.get(
        `http://localhost:8080/api/user/validateUsername/${username}`,
        { withCredentials: true }
      );
      if (res.data.message === "Username Already Used") {
        return setErrorMessage("Username Already Used");
      }
    }
    if (email.length > 0) {
      const res = await axios.get(
        `http://localhost:8080/api/user/validateEmail/${email}`,
        { withCredentials: true }
      );
      if (res.data.message === "Email already used") {
        return setErrorMessage("Email already used");
      }
    }
    if (password.length <= 6) {
      return setErrorMessage("Password must be 6 digit long");
    }
    if (password !== confirmPassword) {
      return setErrorMessage("Enter Same Password");
    }
    // Make a POST request to your backend for user registration using Axios
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          username,
          email,
          password,
          cpassword: confirmPassword, // Send confirmPassword to the backend
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (response.status === 200) {
        toast.success("Registration Successful!");
        // You can redirect the user to the login page or perform other actions
        navigate("/login");
      }
    } catch (error) {
      // console.error("Error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        toast.info(`${error.response.data.message}`);
        setLoading(false);
      } else {
        setErrorMessage("An error occurred while registering.");
        toast.error("An error occurred while registering.");
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loader1 />;
  }

  return (
    <div className="container">
      <h2 className="my-5">Registration Page</h2>
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
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="form-group mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        Already a member? <Link to="/login">Login</Link>
        <div>
          <button type="submit" className="btn btn-primary mt-2 px-5">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
