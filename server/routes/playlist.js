const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../controllers/authControllers");
const { addCartItemsToPlaylist } = require("../controllers/playlistController");

// Add to Cart Route
router.post("/edit", isAuthenticated, addCartItemsToPlaylist);

module.exports = router;
