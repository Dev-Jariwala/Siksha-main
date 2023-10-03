const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: false, // Allow null values
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
