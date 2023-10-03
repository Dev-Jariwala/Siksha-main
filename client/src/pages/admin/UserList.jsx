import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "../../components/loaders/LoadingAnimation";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users to display per page
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  useEffect(() => {
    // Fetch user data from your API endpoint
    axios
      .get("http://localhost:8080/api/user/fetch-allusers", {
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [setUsers]);

  // Calculate the indexes of the first and last users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Slice the filtered users for pagination
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
      paginate(currentPage + 1);
    }
  };

  // Function to handle deleting a user
  const handleDeleteUser = (userId) => {
    setLoading(true);
    // Send a request to your API to delete the user with the specified ID
    axios
      .delete(`http://localhost:8080/api/user/delete/${userId}`, {
        withCredentials: true,
      })
      .then((response) => {
        axios
          .get("http://localhost:8080/api/user/fetch-allusers", {
            withCredentials: true,
          })
          .then((response) => {
            setUsers(response.data.users);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
        setLoading(false);
        toast.success("User Deleted Successfuly!");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setLoading(false);
        toast.error("Error Deleting Course");
      });
  };

  // Function to handle editing a user's role
  const handleEditUser = (userId, newRole) => {
    // Send a request to your API to update the user's role
    setLoading(true);
    axios
      .put(
        `http://localhost:8080/api/user/role/${userId}`,
        { role: newRole },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        axios
          .get("http://localhost:8080/api/user/fetch-allusers", {
            withCredentials: true,
          })
          .then((response) => {
            setUsers(response.data.users);
            toast.success(
              `${newRole === "admin" ? "user" : "admin"} Changed to ${newRole}`
            );
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            toast.error("Error Changing Role");
          });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        setLoading(false);
      });
  };

  // Function to capitalize the first character of a string
  const capitalizeFirstLetter = (str) => {
    if (str && typeof str === "string") {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by firstname, lastname, email, username, mobilenumber, or gender"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div>
          <LoadingAnimation></LoadingAnimation>
        </div>
      ) : (
        <div className="">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile Number</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{capitalizeFirstLetter(user.username)}</td>
                  <td>{user.email}</td>
                  <td>{capitalizeFirstLetter(user.role)}</td>
                  <td>{capitalizeFirstLetter(user.firstname)}</td>
                  <td>{capitalizeFirstLetter(user.lastname)}</td>
                  <td>{user.mobilenumber}</td>
                  <td>{capitalizeFirstLetter(user.gender)}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        className="btn btn-primary btn-sm mx-2"
                        onClick={() => handleEditUser(user._id, "user")}
                      >
                        Make User
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm mx-2"
                        onClick={() => handleEditUser(user._id, "admin")}
                      >
                        Make Admin
                      </button>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={goToPreviousPage}>
                Previous
              </button>
            </li>
            {Array.from({
              length: Math.ceil(filteredUsers.length / usersPerPage),
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === Math.ceil(filteredUsers.length / usersPerPage)
                  ? "disabled"
                  : ""
              }`}
            >
              <button className="page-link" onClick={goToNextPage}>
                Next
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserList;
