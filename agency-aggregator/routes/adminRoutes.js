const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllAgencies,
  editAgencyProfile,
  deleteAgency,
  toggleAgencyStatus
} = require('../controllers/adminController');

const router = express.Router();

// GET: Fetch all registered agencies (Admin-only route)
router.get('/agencies', protect, admin, getAllAgencies);

// PUT: Edit an agency profile (Admin-only route)
router.put('/agency/:id', protect, admin, editAgencyProfile);

// DELETE: Delete an agency (Admin-only route)
router.delete('/agency/:id', protect, admin, deleteAgency);

// PUT: Activate or deactivate an agency (Admin-only route)
router.put('/agency/:id/toggle', protect, admin, toggleAgencyStatus);

module.exports = router;
