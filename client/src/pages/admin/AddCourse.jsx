import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddCourse = () => {
  const initialData = {
    category: "",
    image: null,
    course_name: "",
    description: "",
    rating_count: 0,
    rating_star: 0,
    students: 0,
    course_url: "",
    creator: "",
    updated_date: "",
    lang: "",
    actual_price: 0,
    discounted_price: 0,
    what_you_will_learn: [],
    content: [],
  };
  const [courseData, setCourseData] = useState(initialData);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setCourseData({
      ...courseData,
      image: file,
    });
  };
  const handleLearnItemsChange = (e) => {
    const value = e.target.value;
    // Split the input value by comma and trim whitespace
    const learnItems = value.split(",");
    setCourseData({
      ...courseData,
      what_you_will_learn: learnItems,
    });
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    // Split the input value by comma and trim whitespace
    const contentItems = value.split(",");
    console.log(contentItems);
    setCourseData({
      ...courseData,
      content: contentItems,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/course/create-course",
        courseData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Redirect or show a success message here
      toast.success("Course created successfully");
      setCourseData(initialData);
      navigate("/allcourses");
    } catch (error) {
      console.error("Error creating course", error);
      toast.error("Error creating course");
      // Handle the error appropriately
    }
  };

  return (
    <div className="px-5 mt-5">
      <h2 className="my-3">Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-3">
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
          <div className="form-group col-3">
            <label className="form-label" htmlFor="image">
              Image:
            </label>
            <input
              required
              className="form-control py-2"
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-3">
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
          <div className="form-group col-3">
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
          <div className="form-group col-3">
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
          <div className="form-group col-3">
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
          <div className="form-group col-3">
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
          <div className="form-group col-3">
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
          <div className="form-group col-3">
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
          <div className="form-group col-3">
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
          <div className="form-group col-3">
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
          <div className="form-group col-3">
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
          <div className="form-group col-3">
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
          <div className="form-group col-3">
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
          <button className="btn btn-primary mt-3 px-5" type="submit">
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
