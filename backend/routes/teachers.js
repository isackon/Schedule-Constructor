const express = require("express");

const TeacherController = require("../controllers/teachers");

const checkAuth = require("../middleware/check-auth");
// const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, TeacherController.createTeacher);

router.put("/:id", checkAuth, TeacherController.updateTeacher);

router.get("", TeacherController.getTeachers);

router.get("/:id", TeacherController.getTeacher);

router.delete("/:id", checkAuth, TeacherController.deleteTeacher);

module.exports = router;
