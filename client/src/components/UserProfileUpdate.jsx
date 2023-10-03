import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfileUpdate = ({ userInfo, setUserInfo }) => {
  const initialData = {
    firstname: userInfo.firstname || "",
    lastname: userInfo.lastname || "",
    mobilenumber: userInfo.mobilenumber || "",
    gender: userInfo.gender || "male", // Set a default value
  };
  const [updatedUserInfo, setUpdatedUserInfo] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDataChanged, setIsDataChanged] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    if (updatedUserInfo.mobilenumber.length !== 10) {
      setErrorMessage("Enter Valid Number");

      return setLoading(false);
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api/user/update",
        updatedUserInfo,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Profile updated successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        setUserInfo({ ...userInfo, ...updatedUserInfo }); // Update the user info in the parent component
        setIsDataChanged(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred while updating the profile.");
      }
    }

    setLoading(false);
  };
  const handleReset = () => {
    setUpdatedUserInfo(initialData);
    setSuccessMessage("");
    setIsDataChanged(false); // Reset data change state
  };
  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo({ ...updatedUserInfo, [name]: value });
    setIsDataChanged(true); // Data has been changed
  };
  // Function to capitalize the first character of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    setUpdatedUserInfo({
      firstname: userInfo.firstname || "",
      lastname: userInfo.lastname || "",
      mobilenumber: userInfo.mobilenumber || "",
      gender: userInfo.gender || "male",
    });
  }, [userInfo]);

  return (
    <div className="container">
      <h2>Update Profile</h2>
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          {" "}
          <div className="form-group col-6 mb-3">
            <label htmlFor="firstname" className="form-label fs-13">
              First Name:
            </label>
            <input
              type="text"
              name="firstname"
              className="form-control"
              value={updatedUserInfo.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-6 mb-3">
            <label htmlFor="lastname" className="form-label fs-13">
              Last Name:
            </label>
            <input
              type="text"
              name="lastname"
              className="form-control"
              value={updatedUserInfo.lastname}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          {" "}
          <div className="form-group col-6 mb-3">
            <label htmlFor="mobilenumber" className="form-label fs-13">
              Mobile Number:
            </label>
            <input
              type="number"
              name="mobilenumber"
              className="form-control"
              value={updatedUserInfo.mobilenumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-6 mb-3">
            <label htmlFor="gender" className="form-label fs-13">
              Gender:
            </label>
            <select
              name="gender"
              className="form-select"
              value={updatedUserInfo.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center my-3">
          <button
            type="submit"
            disabled={loading || !isDataChanged}
            className="btn btn-dark mx-3"
          >
            Save Changes
          </button>

          <button
            type="reset"
            disabled={loading || !isDataChanged}
            className="btn btn-outline-dark mx-3 px-5"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileUpdate;
