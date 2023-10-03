import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Home, SingleCourse, Cart, Courses, User } from "./pages";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import SingleCoursePage from "./pages/SingleCoursePage";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import AllCourses from "./pages/admin/AllCourses";
import AddCourse from "./pages/admin/AddCourse";
import EditCourse from "./pages/admin/EditCourse";
import AdminProtected from "./pages/admin/AdminProtected";
import RegisterPage from "./pages/RegisterPage";
import UserList from "./pages/admin/UserList";
import Course from "./components/Course";

// import Footer2 from './components/footer2';

function App() {
  const { setAuthenticated, setUserInfo, setCartItems } = useAuth();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/authenticate",
          { withCredentials: true }
        );
        const { authenticated, user } = response.data;
        setAuthenticated(authenticated);
        console.log(authenticated);
        setUserInfo(user);
        console.log(user);
        setCartItems(user.cart);
      } catch (error) {
        // console.error("Error checking authentication:", error);
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [setAuthenticated, setUserInfo, setCartItems]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/cart/fetch-cartItems",
          { withCredentials: true }
        );
        setCartItems(response.data.cartItems);
        console.log(response.data.cartItems);
      } catch (error) {
        // console.error("Error fetching cartItems:", error);
      }
    };
    fetchCartItems();
  }, [setCartItems]);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar psa={setAuthenticated} psui={setUserInfo} psci={setCartItems} />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/course/:_id" element={<SingleCoursePage />} />
        <Route path="/category/:category" element={<Course />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allcourses"
          element={
            <AdminProtected>
              <AllCourses />
            </AdminProtected>
          }
        />
        <Route
          path="/addcourse"
          element={
            <AdminProtected>
              <AddCourse />
            </AdminProtected>
          }
        />
        <Route
          path="/editcourse/:_id"
          element={
            <AdminProtected>
              <EditCourse />
            </AdminProtected>
          }
        />
        <Route
          path="/allusers"
          element={
            <AdminProtected>
              <UserList />
            </AdminProtected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
