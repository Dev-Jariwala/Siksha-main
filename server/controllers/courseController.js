const Course = require("../models/courseSchema");
const User = require("../models/userSchema");

// Create Course Controller
exports.courseCreate = async (req, res) => {
  const {
    id,
    category,
    course_name,
    description,
    rating_count,
    rating_star,
    students,
    creator,
    course_url,
    updated_date,
    lang,
    actual_price,
    discounted_price,
    what_you_will_learn,
    content,
  } = req.body;
  let image;
  if (req.file) {
    image = req.file.filename;
  } else {
    image = "";
  }

  try {
    // Creating a new course
    const newCourse = new Course({
      id,
      category,
      image,
      course_name,
      description,
      course_url,
      rating_count,
      rating_star,
      students,
      creator,
      updated_date,
      lang,
      actual_price,
      discounted_price,
      what_you_will_learn,
      content,
    });

    await newCourse.save();
    res.status(200).json({ message: "Course Created Successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating course" });
  }
};

// Fetch All Courses Controller
exports.fetchAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};

// Update Course Controller
exports.courseUpdate = async (req, res) => {
  const { courseId } = req.params;
  const {
    category,
    course_name,
    description,
    rating_count,
    rating_star,
    course_url,
    students,
    creator,
    updated_date,
    lang,
    actual_price,
    discounted_price,
    what_you_will_learn,
    content,
  } = req.body;
  // console.log(req.body);

  try {
    const course = Course.findById(courseId);
    if (course) {
      // Check if an image file was uploaded
      if (req.file) {
        // console.log(req.file);
        // If an image was uploaded, update the image field
        const image = req.file.filename;
        await Course.findByIdAndUpdate(courseId, { image });
      }
      const updateCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          category,
          course_name,
          description,
          rating_count,
          rating_star,
          students,
          course_url,
          creator,
          updated_date,
          lang,
          actual_price,
          discounted_price,
          what_you_will_learn,
          content,
        },
        { new: true }
      );
      res.json(updateCourse);
    } else {
      res.status(401).json({ message: "Course Not Found" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Error updating course" });
  }
};

// Delete Course Controller
exports.courseDelete = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (course) {
      // Remove the course from all users' carts
      const users = await User.find({ cart: courseId });

      for (const user of users) {
        const updatedCart = user.cart.filter((item) => item.equals(courseId));
        user.cart = updatedCart;
        await user.save();
      }

      // Remove cartItems with course set to null from users' carts
      await User.updateMany(
        { cart: { $elemMatch: { course: null } } },
        { $pull: { cart: { course: null } } }
      );

      // Remove the course from all users' playlists
      await User.updateMany(
        { playlist: courseId },
        { $pull: { playlist: courseId } }
      );

      // Delete the course
      await Course.findByIdAndDelete(courseId);

      res.status(200).json({ message: "Course Deleted" });
    } else {
      res.status(400).json({ message: "Course Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting course" });
  }
};

// Filter Courses Controller
exports.filterCourses = async (req, res) => {
  const { category } = req.params;
  const decodedCategory = decodeURIComponent(category);

  try {
    const filteredCourses = await Course.find({ category: decodedCategory });
    res.status(200).json({ filteredCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error filtering courses" });
  }
};
// Fetch Course-Details Controller
exports.fetchCourseDetails = async (req, res) => {
  const { courseId } = req.params;

  try {
    const courseDetails = await Course.findById(courseId);
    res.status(200).json({ courseDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching course details" });
  }
};
