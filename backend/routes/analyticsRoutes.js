const express = require("express");
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { getAdminStarts } = require("../controllers/analyticsController");

const router = express.Router();

router.get("/", protect, admin, getAdminStarts);

module.exports = router;