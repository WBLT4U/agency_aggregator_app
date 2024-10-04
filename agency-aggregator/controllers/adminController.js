const User = require('../models/User');

// Fetch all registered agencies (Admin-only)
exports.getAllAgencies = async (req, res) => {
  try {
    const agencies = await User.find({ role: 'agency' }).select('-password');
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Fetch a single agency by ID (Admin-only)
exports.getAgencyById = async (req, res) => {
  try {
    const agency = await User.findById(req.params.id);

    if (!agency || agency.role !== 'agency') {
      return res.status(404).json({ message: 'Agency not found' });
    }

    res.json({ agencyDetails: agency.agencyDetails });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Edit an agency's profile (Admin-only)
// Edit an agency's profile (Admin-only)
exports.editAgencyProfile = async (req, res) => {
  try {
    const { agencyDetails } = req.body; // Ensure the incoming data structure is correct
    const agency = await User.findById(req.params.id);

    if (!agency || agency.role !== 'agency') {
      return res.status(404).json({ message: 'Agency not found' });
    }

    // Update agency details
    agency.agencyDetails = { ...agency.agencyDetails, ...agencyDetails }; 
    await agency.save(); // Ensure the save operation completes

    // Optionally, you can return the updated agency
    res.json({ message: 'Agency profile updated successfully', agency });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an agency (Admin-only)
exports.deleteAgency = async (req, res) => {
  try {
    console.log('Received delete request for agency ID:', req.params.id); // Log the received ID

    const agency = await User.findById(req.params.id);
    console.log('Agency fetched:', agency); // Log the fetched agency

    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    if (agency.role !== 'agency') {
      return res.status(400).json({ message: 'User does not have agency role' });
    }

    console.log('Deleting agency with ID:', agency._id);
    // Use findByIdAndDelete to remove the agency directly
    await User.findByIdAndDelete(req.params.id); // Perform the deletion

    console.log('Agency deleted successfully');
    res.json({ message: 'Agency removed successfully' });
  } catch (error) {
    console.error('Error deleting agency:', error.message); // Log full error message
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Toggle agency active/inactive status (Admin-only)
exports.toggleAgencyStatus = async (req, res) => {
  try {
    const agency = await User.findById(req.params.id);

    if (!agency || agency.role !== 'agency') {
      return res.status(404).json({ message: 'Agency not found' });
    }

    agency.isActive = !agency.isActive;  // Toggle the active status
    await agency.save();
    res.json({ message: `Agency is now ${agency.isActive ? 'active' : 'inactive'}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
