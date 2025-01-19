const express = require("express");

const { protect } = require("../controllers/authController");

const {
  getAllVisitors,
  createVisitor,
  getVisitor,
  updateVisitor,
  deleteVisitor,
  getVisitorsStats,
  getVisitorsByMonth,
} = require("../controllers/visitorController");

const router = express.Router();

// router.param("id", checkID);
router.route("/visitor-stats").get(getVisitorsStats);
router.route("/visitor-monthly-stat/:year").get(getVisitorsByMonth);

router.route("/").get(protect, getAllVisitors).post(createVisitor);

router.route("/:id").get(getVisitor).patch(updateVisitor).delete(deleteVisitor);

module.exports = router;
