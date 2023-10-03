import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Course from "./Course";
// import courses from "../utils/data";
import axios from "axios";
import Loader1 from "./loaders/Loader1";

const Tabs = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabHandler = (category) => {
    setActiveTab(category);
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchAllCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/course/fetch-allcourses",
        { withCredentials: true }
      );
      setCourses(res.data.courses);
      const uniqueCategories = [
        "all",
        ...new Set(
          res.data.courses.map((course) => {
            return course.category;
          })
        ),
      ];
      console.log(uniqueCategories);
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, [setCourses]);
  if (loading) {
    return <Loader1></Loader1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <TabsWrapper>
      <div className="tabs">
        <ul className="flex flex-wrap">
          {categories.map((category) => (
            <li key={category} className="tabs-head-item">
              <button
                type="button"
                className={`tab-btn ${
                  activeTab === `${category}` ? "active-tab" : ""
                }`}
                onClick={() => tabHandler(category)}
              >
                {capitalizeFirstLetter(category)}
              </button>
            </li>
          ))}
        </ul>

        <div className="tabs-body">
          {activeTab !== "all" &&
            courses
              .filter((course) => course.category === activeTab)
              .map((course) => <Course key={course._id} course={course} />)}
          {activeTab === "all" &&
            courses.map((course) => (
              <Course key={course._id} course={course} />
            ))}
        </div>
      </div>
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  .tabs {
    margin-top: 16px;
    .tabs-head-item button {
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;

      &:hover {
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body {
      margin-top: 32px;
    }

    @media screen and (min-width: 600px) {
      .tabs-body {
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px) {
      .tabs-body {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px) {
      .tabs-body {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;

export default Tabs;
