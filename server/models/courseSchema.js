const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  category: String,
  image: String,
  course_name: String,
  description: String,
  rating_count: Number,
  rating_star: Number,
  students: Number,
  creator: String,
  course_url: String,
  updated_date: String,
  lang: [String],
  actual_price: Number,
  discounted_price: Number,
  what_you_will_learn: [String],
  content: [String],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
