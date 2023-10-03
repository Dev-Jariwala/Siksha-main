import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StarRating from "../../components/StarRating";
import axios from "axios";
import { toast } from "react-toastify";

const AdminCourse = ({ course, setCourses }) => {
  const {
    _id,
    image,
    course_name,
    creator,
    actual_price,
    discounted_price,
    rating_count,
    rating_star,
  } = course;
  const [btnLoading, setBtnLoading] = useState(false);

  const deleteCourse = async (courseId) => {
    try {
      setBtnLoading(true);
      await axios.delete(
        `http://localhost:8080/api/course/delete-course/${courseId}`,
        { withCredentials: true }
      );
      const res = await axios.get(
        "http://localhost:8080/api/course/fetch-allcourses",
        { withCredentials: true }
      );
      setCourses(res.data.courses);
      setBtnLoading(false);
      toast.success("Course Deleted");
    } catch (error) {
      // console.log(error);
      setBtnLoading(false);
      toast.error("Error deleting course");
    }
  };

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
      <div className="item-btns flex">
        <Link to={`/editcourse/${_id}`} className="item-btn see-details-btn">
          Edit
        </Link>
        <div
          className={`item-btn add-to-cart-btn ${
            btnLoading ? "btn-loading" : ""
          }`}
          onClick={() => deleteCourse(_id)}
        >
          Delete
        </div>
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

export default AdminCourse;
