const express = require("express");

const SubjectController = require("../controllers/subjects");

const checkAuth = require("../middleware/check-auth");
// const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, SubjectController.createSubject);

router.put("/:id", checkAuth, SubjectController.updateSubject);

router.get("", SubjectController.getSubjects);

router.get("/:id", SubjectController.getSubject);

router.delete("/:id", checkAuth, SubjectController.deleteSubject);

module.exports = router;
