import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCourse = () => {
  const { _id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    category: "",
    image: null,
    course_name: "",
    description: "",
    course_url: "",
    rating_count: 0,
    rating_star: 0,
    students: 0,
    creator: "",
    updated_date: "",
    lang: "",
    actual_price: 0,
    discounted_price: 0,
    what_you_will_learn: [],
    content: [],
  });

  const [originalCourseData, setOriginalCourseData] = useState({});
  const [isDataChanged, setIsDataChanged] = useState(false); // Track data changes

  useEffect(() => {
    // Fetch the original course data by _id
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/course/fetch-courseDetails/${_id}`)
      .then((response) => {
        setOriginalCourseData(response.data.courseDetails);
        setCourseData(response.data.courseDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course details", error);
        setLoading(false);
      });
  }, [_id]);
  // Update isDataChanged whenever courseData changes
  useEffect(() => {
    const hasDataChanged = !compareObjects(courseData, originalCourseData);
    setIsDataChanged(hasDataChanged);
  }, [courseData, originalCourseData]);

  // Function to compare two objects
  const compareObjects = (objA, objB) => {
    for (let key in objA) {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourseData({
      ...courseData,
      image: file,
    });
  };

  const handleLearnItemsChange = (e) => {
    const value = e.target.value;
    // Split the input value by comma and trim whitespace
    const learnItems = value.split(",").map((item) => item.trim());
    setCourseData({
      ...courseData,
      what_you_will_learn: learnItems,
    });
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    // Split the input value by comma and trim whitespace
    const contentItems = value.split(",").map((item) => item.trim());
    setCourseData({
      ...courseData,
      content: contentItems,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the course data
      setLoading(true);
      await axios.put(
        `http://localhost:8080/api/course/update-course/${_id}`,
        courseData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Redirect or show a success message here
      toast.success("Course updated successfully");
      setLoading(false);
      navigate("/allcourses");
    } catch (error) {
      console.error("Error updating course", error);
      // Handle the error appropriately
      setLoading(false);
      toast.error("Error updating course");
    }
  };

  return (
    <div className="px-5 mt-5">
      <h2 className="my-3">Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-6">
            <label className="form-label text-lg" htmlFor="category">
              Category:
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="category"
              name="category"
              value={courseData.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-6">
            <label className="form-label" htmlFor="image">
              Image:
            </label>
            <input
              className="form-control py-2"
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-6">
            <label className="form-label" htmlFor="course_name">
              Course Name:
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="course_name"
              name="course_name"
              value={courseData.course_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-6">
            <label className="form-label" htmlFor="description">
              Description:
            </label>
            <textarea
              required
              className="form-control"
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-6">
            <label className="form-label" htmlFor="rating_count">
              Rating Count:
            </label>
            <input
              required
              className="form-control py-2"
              type="number"
              id="rating_count"
              name="rating_count"
              value={courseData.rating_count}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-6">
            <label className="form-label" htmlFor="rating_star">
              Rating Star:
            </label>
            <input
              required
              className="form-control py-2"
              type="number"
              id="rating_star"
              name="rating_star"
              value={courseData.rating_star}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-6">
            <label className="form-label" htmlFor="students">
              Students:
            </label>
            <input
              required
              className="form-control py-2"
              type="number"
              id="students"
              name="students"
              value={courseData.students}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-6">
            <label className="form-label" htmlFor="creator">
              Creator:
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="creator"
              name="creator"
              value={courseData.creator}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-6">
            <label className="form-label" htmlFor="updated_date">
              Updated Date:
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="updated_date"
              name="updated_date"
              value={courseData.updated_date}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-6">
            <label className="form-label" htmlFor="lang">
              Language:
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="lang"
              name="lang"
              value={courseData.lang}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-6">
            <label className="form-label" htmlFor="actual_price">
              Actual Price:
            </label>
            <input
              required
              className="form-control py-2"
              type="number"
              id="actual_price"
              name="actual_price"
              value={courseData.actual_price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-6">
            <label className="form-label" htmlFor="discounted_price">
              Discounted Price:
            </label>
            <input
              required
              className="form-control py-2"
              type="number"
              id="discounted_price"
              name="discounted_price"
              value={courseData.discounted_price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-6">
            <label className="form-label" htmlFor="what_you_will_learn">
              What You Will Learn (Separated by Commas):
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="what_you_will_learn"
              name="what_you_will_learn"
              value={courseData.what_you_will_learn.join(",")}
              onChange={handleLearnItemsChange}
            />
          </div>
          <div className="form-group col-6">
            <label className="form-label" htmlFor="content">
              Course Content (Separated by Commas):
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="content"
              name="content"
              value={courseData.content.join(",")}
              onChange={handleContentChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-6">
            <label className="form-label" htmlFor="course_url">
              Course Url:
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="course_url"
              name="course_url"
              value={courseData.course_url}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary mt-3 px-5"
            type="submit"
            disabled={!isDataChanged} // Disable the button if data is not changed
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
