const User = require('../models/User');  // Import the User model

// Controller to get the logged-in user's profile
exports.getAgencyProfile = async (req, res) => {
  try {
    // Find the user by their ID, which is attached by the 'protect' middleware
    const user = await User.findById(req.user.id).select('-password');  // Exclude the password field

    if (!user) {
      return res.status(404).json({ message: 'Agency not found' });  // If no user is found, send 404
    }

    // Send back the user's data, including the role and agency details
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      agencyDetails: user.agencyDetails,  // Return agency-specific details
    });
  } catch (error) {
    console.error('Error fetching agency profile:', error);  // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });  // Send back a 500 error if something goes wrong
  }
};

// Controller to update the logged-in user's profile
exports.updateAgencyProfile = async (req, res) => {
  try {
    // Destructure the agencyDetails from the request body
    const { agencyDetails } = req.body;

    // Find the user by their ID, which is attached by the 'protect' middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Agency not found' });  // If no user is found, send 404
    }

    // Update the user's agency details by merging the existing details with the new ones from the request
    user.agencyDetails = { ...user.agencyDetails, ...agencyDetails };

    // Save the updated user to the database
    await user.save();

    // Send the updated user back in the response
    res.json(user);
  } catch (error) {
    console.error('Error updating agency profile:', error);  // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });  // Send back a 500 error if something goes wrong
  }
};