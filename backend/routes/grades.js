const express = require("express");

const GradeController = require("../controllers/grades");

const checkAuth = require("../middleware/check-auth");
// const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, GradeController.createGrade);

router.put("/:id", checkAuth, GradeController.updateGrade);

router.get("", GradeController.getGrades);

router.get("/:id", GradeController.getGrade);

router.delete("/:id", checkAuth, GradeController.deleteGrade);

module.exports = router;
