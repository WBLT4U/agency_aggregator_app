const User = require('../models/User');

// Fetch all registered agencies (admin-only)
exports.getAllAgencies = async (req, res) => {
  try {
    const agencies = await User.find({ role: 'agency' }).select('-password');  // Fetch only users with 'agency' role
    res.json(agencies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Edit an agency's profile (admin-only)
exports.editAgencyProfile = async (req, res) => {
  try {
    const { agencyDetails } = req.body;
    const agency = await User.findById(req.params.id);

    if (!agency || agency.role !== 'agency') {
      return res.status(404).json({ message: 'Agency not found' });
    }

    agency.agencyDetails = { ...agency.agencyDetails, ...agencyDetails };  // Update the agency's details
    await agency.save();
    res.json(agency);  // Return the updated agency profile
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an agency (admin-only)
exports.deleteAgency = async (req, res) => {
  try {
    const agency = await User.findById(req.params.id);

    if (!agency || agency.role !== 'agency') {
      return res.status(404).json({ message: 'Agency not found' });
    }

    await agency.remove();  // Remove the agency from the database
    res.json({ message: 'Agency removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Activate or deactivate an agency (admin-only)
exports.toggleAgencyStatus = async (req, res) => {
  try {
    const agency = await User.findById(req.params.id);

    if (!agency || agency.role !== 'agency') {
      return res.status(404).json({ message: 'Agency not found' });
    }

    agency.isActive = !agency.isActive;  // Toggle the active status
    await agency.save();
    res.json({ message: `Agency is now ${agency.isActive ? 'active' : 'inactive'}`, agency });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
