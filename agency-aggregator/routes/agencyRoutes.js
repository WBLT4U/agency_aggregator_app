const express = require('express');
const { getAgencyProfile, updateAgencyProfile } = require('../controllers/agencyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Ensure 'getAgencyProfile' and 'updateAgencyProfile' are correctly imported
router.get('/profile', protect, getAgencyProfile);        // Fetch agency profile
router.put('/profile', protect, updateAgencyProfile);     // Update agency profile

module.exports = router;