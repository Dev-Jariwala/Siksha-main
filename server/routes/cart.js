const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../controllers/authControllers");
const {
  addToCart,
  fetchCartItems,
  removeCartItem,
  updatedCartItem,
  updatedCartItemSize,
  removeAllCartItems,
} = require("../controllers/cartController");

// Add to Cart Route
router.post("/add-to-cart/:courseId", isAuthenticated, addToCart);

// Fetch Cart Items Route
router.get("/fetch-cartItems", isAuthenticated, fetchCartItems);

// Update Cart Item Quantity Route
router.put("/update-cartItem/:cartItemId", isAuthenticated, updatedCartItem);

// Delete Cart Item Route
router.delete("/remove-cartItem/:cartItemId", isAuthenticated, removeCartItem);

router.delete("/remove-allCartItems", isAuthenticated, removeAllCartItems);

module.exports = router;
