const express = require("express");
const router = express.Router();
const { isAdmin } = require("../controllers/authControllers");
const multer = require("multer");
const {
  courseCreate,
  fetchAllCourses,
  courseDelete,
  courseUpdate,
  filterCourses,
  fetchCourseDetails,
} = require("../controllers/courseController");

// Courses routes...

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create Course Route with a single image
router.post(
  "/create-course",
  isAdmin,
  upload.single("image"), // Allow only a single file upload with the field name "image"
  courseCreate
);

// Fetch All courses Route
router.get("/fetch-allcourses", fetchAllCourses);

// Update course Route
router.put(
  "/update-course/:courseId",
  isAdmin,
  upload.single("image"),
  courseUpdate
);

// Delete course Route
router.delete("/delete-course/:courseId", isAdmin, courseDelete);

// filter courses route
router.get("/filter-courses/:category", filterCourses);

// fetch course details route
router.get("/fetch-courseDetails/:courseId", fetchCourseDetails);

module.exports = router;
