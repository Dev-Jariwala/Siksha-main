import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import CourseLoader from "./loaders/CourseLoader";

const Course = ({ course }) => {
  const {
    _id,
    image,
    course_name,
    creator,
    actual_price,
    discounted_price,
    rating_count,
    rating_star,
    course_url,
  } = course;
  // console.log(course);
  const { setCartItems, userInfo, setUserInfo, setAuthenticated } = useAuth();
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCoursePurchased, setPurchased] = useState(false);
  const navigate = useNavigate();

  const fetchPlaylistDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/user/authenticate",
        { withCredentials: true }
      );
      const { authenticated, user } = response.data;
      setUserInfo(user);
      setAuthenticated(authenticated);
      setLoading(false);
    } catch (error) {
      // console.log("Error fetching playlist:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch playlist details when the component mounts
    fetchPlaylistDetails();
  }, []);

  const addToCart = async (courseId) => {
    try {
      setBtnLoading(true);
      const res = await axios.post(
        `http://localhost:8080/api/cart/add-to-cart/${courseId}`,
        null,
        { withCredentials: true }
      );
      if (res.data.message === "Course is already purchased") {
        setBtnLoading(false);
        return toast.warn("Course is already purchased");
      }
      if (res.data.message === "Course already in cart") {
        setBtnLoading(false);
        return toast.warn("Course already in cart");
      }
      const response = await axios.get(
        "http://localhost:8080/api/cart/fetch-cartItems",
        { withCredentials: true }
      );
      setCartItems(response.data.cartItems);
      setBtnLoading(false);
      return toast.success("Course added to cart!");
    } catch (error) {
      // console.log(error);
      if (error.response.status === 401) {
        toast.error("Login to add course to cart");
        setBtnLoading(false);
        navigate("/login");
        return;
      }
      setBtnLoading(false);
      return toast.error("error adding course to cart");
    }
  };

  useEffect(() => {
    if (userInfo?.playlist?.includes(_id)) {
      // console.log(playlist);
      setPurchased(true);
    }
  }, [setAuthenticated, setUserInfo]);
  if (loading) {
    return <CourseLoader></CourseLoader>;
  }

  return (
    <CourseCard>
      <div className="item-img">
        <img src={`images/${image}`} alt={course_name} />
      </div>
      <div className="item-body">
        <h5 className="item-name">{course_name}</h5>
        <span className="item-creator">{creator}</span>
        <div className="item-rating flex">
          <span className="rating-star-val">{rating_star}</span>
          <StarRating rating_star={rating_star} />
          <span className="rating-count">({rating_count})</span>
        </div>
        <div className="item-price">
          <span className="item-price-new">₹{discounted_price}</span>
          <span className="item-price-old">₹{actual_price}</span>
        </div>
      </div>
      <div className="item-btns d-flex align-items-center justify-content-around">
        <Link
          to={`/course/${_id}`}
          className="item-btn see-details-btn"
          style={{ color: "black", textDecoration: "none" }}
        >
          See details
        </Link>
        {isCoursePurchased ? (
          <a href={`${course_url}`} target="_blank" rel="noopener noreferrer">
            <div className="item-btn add-to-cart-btn">
              <i className="fas fa-play"></i> &nbsp; Watch
            </div>
          </a>
        ) : (
          <div
            className={`item-btn add-to-cart-btn ${
              btnLoading ? "btn-loading" : ""
            }`}
            onClick={() => addToCart(_id)}
          >
            Add to cart
          </div>
        )}
      </div>
    </CourseCard>
  );
};

const CourseCard = styled.div`
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  display: flex;
  flex-direction: column;
  .item-body {
    margin: 14px 0;
    padding: 4px 18px;

    .item-name {
      font-size: 15px;
      line-height: 1.4;
      font-weight: 800;
    }
    .item-creator {
      font-size: 12.5px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }
    .rating-star-val {
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: 800;
      color: #b4690e;
      margin-right: 6px;
    }
    .rating-count {
      font-size: 12.5px;
      margin-left: 3px;
      font-weight: 500;
      opacity: 0.8;
    }
    .item-price-new {
      font-weight: 700;
      font-size: 15px;
    }
    .item-price-old {
      opacity: 0.8;
      font-weight: 500;
      text-decoration: line-through;
      font-size: 15px;
      margin-left: 8px;
    }
  }

  .item-btns {
    justify-self: flex-start;
    padding: 4px 8px 30px 18px;
    margin-top: auto;
    .item-btn {
      font-size: 15px;
      display: inline-block;
      padding: 6px 16px;
      font-weight: 700;
      transition: var(--transition);
      white-space: nowrap;

      &.see-details-btn {
        background-color: transparent;
        border: 1px solid var(--clr-black);
        margin-right: 5px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.9);
          color: var(--clr-white);
        }
      }

      &.add-to-cart-btn {
        background: rgba(0, 0, 0, 0.9);
        color: var(--clr-white);
        border: 1px solid rgba(0, 0, 0, 0.9);
        cursor: pointer;
        &:hover {
          background-color: transparent;
          color: rgba(0, 0, 0, 0.9);
        }
      }
      /* Add to cart button */
      &.btn-loading {
        opacity: 50%;
        cursor: not-allowed;
        position: relative;
      }

      &.btn-loading::after {
        content: "";
        border: 4px solid rgba(255, 255, 255, 0.3); /* Spinner color */
        border-top: 4px solid #333; /* Spinner color */
        border-radius: 50%;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: spin 1s linear infinite; /* Rotation animation */
      }

      @keyframes spin {
        0% {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
    }
  }
`;

export default Course;
