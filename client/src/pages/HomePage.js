import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CoursesList from "../components/CourseList";
import Footer2 from "../components/footer2";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loader1 from "../components/loaders/Loader1";

const HomePage = () => {
  const { setUserInfo, setAuthenticated, setCartItems } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/authenticate",
          { withCredentials: true }
        );
        const { authenticated, user } = response.data;
        setAuthenticated(authenticated);
        // console.log(authenticated);
        setUserInfo(user);
        // console.log(user);
        setCartItems(user.cart);
        setLoading(false);
      } catch (error) {
        // console.error("Error checking authentication:", error);
        setAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [setAuthenticated, setUserInfo, setCartItems]);
  if (loading) {
    return <Loader1></Loader1>;
  }

  return (
    <div className="holder">
      <Hero />
      {/* <CategoriesList /> */}
      <CoursesList />
      <Footer2 />
    </div>
  );
};

export default HomePage;
