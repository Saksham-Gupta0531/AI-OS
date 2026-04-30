const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// @route   GET /api/packages
// @desc    Get all packages
router.get('/', packageController.getAllPackages);

// @route   POST /api/packages/agent
// @desc    Add a new agent to a package
router.post('/agent', packageController.addAgentToPackage);

module.exports = router;
