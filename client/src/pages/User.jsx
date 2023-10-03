import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import "./userp.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import axios from "axios";
import PlaylistItem from "../components/PlaylistItem";
import { useAuth } from "../context/AuthContext";
import UserLoader from "../components/loaders/UserLoader";
import UserProfileUpdate from "../components/UserProfileUpdate";
import { toast } from "react-toastify";

export default function User() {
  const { userInfo, setUserInfo, setAuthenticated, setCartItems } = useAuth();
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState([]);
  const [playlistLoading, setPlaylistLoading] = useState(false);
  // Function to capitalize the first character of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchPlaylistDetails = async () => {
    try {
      setLoading(true);
      setPlaylistLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/user/authenticate",
        { withCredentials: true }
      );
      const { authenticated, user } = response.data;
      setUserInfo(user);
      setAuthenticated(authenticated);
      const data = user.playlist.map((courseId) => courseId);
      const courseDetailsArray = await Promise.all(
        data.map(async (courseId) => {
          const res = await axios.get(
            `http://localhost:8080/api/course/fetch-courseDetails/${courseId}`
          );
          return res.data.courseDetails;
        })
      );
      setPlaylist(courseDetailsArray);
      setPlaylistLoading(false); // Set loading to false after playlist data is fetched
      setLoading(false);
    } catch (error) {
      // console.log("Error fetching playlist:", error);
      setPlaylistLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch playlist details when the component mounts
    fetchPlaylistDetails();
  }, []);
  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get("http://localhost:8080/api/user/logout", {
        withCredentials: true,
      });
      setAuthenticated(false);
      setUserInfo(null);
      toast.success("Logout Successfully!");
      setLoading(false);
      setCartItems([]);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };
  if (loading || playlistLoading) {
    return <UserLoader />;
  }
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="fs-20">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="userpn" style={{ textAlign: "center" }}>
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded"
                  style={{ width: "100px", height: "100px" }}
                  fluid
                />
                <p className="text-muted mb-1">
                  {userInfo.username}{" "}
                  {userInfo.role === "admin" && (
                    <span style={{ color: "green", fontWeight: "900" }}>
                      {capitalizeFirstLetter(userInfo.role)}👑
                    </span>
                  )}
                </p>
                <p className="text-muted mb-4">{userInfo.email}</p>
                <div className="d-flex justify-content-center mb-2">
                  {userInfo.role === "admin" && (
                    <>
                      <Link to="/allcourses">
                        <button className="btn btn-outline-primary me-3">
                          Edit Courses
                        </button>
                      </Link>
                      <Link to="/allusers">
                        <button className="btn btn-outline-primary me-3">
                          Edit Users
                        </button>
                      </Link>
                    </>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4">
              <MDBCardBody className="userpn">
                <UserProfileUpdate
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                ></UserProfileUpdate>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <div>
              <Card className="text-center">
                <Card.Body>
                  <Card.Text>Your Playlists</Card.Text>
                  {playlist.length > 0 ? (
                    <ul>
                      {playlist.map((course) => (
                        <li key={course._id}>
                          <PlaylistItem
                            course={course}
                            loading={loading}
                          ></PlaylistItem>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No courses in your playlist yet.</p>
                  )}
                </Card.Body>
              </Card>
            </div>

            <MDBRow>
              <MDBCol md="6"></MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
