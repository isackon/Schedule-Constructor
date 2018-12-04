const express = require("express");

const SubjectController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
// const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, SubjectController.createPost);

router.put("/:id", checkAuth, SubjectController.updatePost);

router.get("", SubjectController.getPosts);

router.get("/:id", SubjectController.getPost);

router.delete("/:id", checkAuth, SubjectController.deletePost);

module.exports = router;
