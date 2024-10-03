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

// Edit an agency's profile (Admin-only)
exports.editAgencyProfile = async (req, res) => {
  try {
    const { agencyDetails } = req.body;
    const agency = await User.findById(req.params.id);

    if (!agency || agency.role !== 'agency') {
      return res.status(404).json({ message: 'Agency not found' });
    }

    agency.agencyDetails = { ...agency.agencyDetails, ...agencyDetails };  // Update the agency details
    await agency.save();
    res.json(agency);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an agency (Admin-only)
exports.deleteAgency = async (req, res) => {
  try {
    const agency = await User.findById(req.params.id);

    if (!agency || agency.role !== 'agency') {
      return res.status(404).json({ message: 'Agency not found' });
    }

    await agency.remove();  // Delete the agency from the database
    res.json({ message: 'Agency removed successfully' });
  } catch (error) {
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
