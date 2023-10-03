const Playlist = require("../models/playlistSchema"); // Import the Playlist model
const CartItem = require("../models/cartSchema");
const User = require("../models/userSchema");

// Add Cart Items to Playlist Controller
exports.addCartItemsToPlaylist = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you're using authentication middleware

    // Find the user by ID and populate their cart
    const user = await User.findById(userId).populate("cart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create an array to hold references to purchased courses
    const purchasedCourses = [];

    // Loop through the user's cart and add purchased courses to the playlist
    for (const cartItem of user.cart) {
      if (cartItem.course) {
        const courseId = cartItem.course;
        console.log(courseId, user.playlist);
        // Check if the user has already purchased this course
        if (
          !user.playlist.some((playlistItem) => playlistItem.equals(courseId))
        ) {
          purchasedCourses.push({ course: courseId });
        }
      }

      // Remove the cart item from the user's cart array
      await CartItem.findByIdAndDelete(cartItem._id);
    }

    // Convert the purchasedCourses array to an array of ObjectId values
    const purchasedCourseIds = purchasedCourses.map((item) => item.course);

    // Add the new purchased course references to the user's playlist
    user.playlist = user.playlist.concat(purchasedCourseIds);

    // Save the updated user document
    await user.save();

    res
      .status(200)
      .json({ message: "Cart items added to playlist successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding cart items to playlist" });
  }
};
