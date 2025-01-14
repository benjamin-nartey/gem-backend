const express = require("express");

const {
  getAllVisitors,
  createVisitor,
  getVisitor,
  updateVisitor,
  deleteVisitor,
} = require("../controllers/visitorController");

const router = express.Router();

router.route("/").get(getAllVisitors).post(createVisitor);

router.route("/:id").get(getVisitor).patch(updateVisitor).delete(deleteVisitor);

module.exports = router;
