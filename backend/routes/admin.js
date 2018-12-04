const express = require("express");

const AdminController = require("../controllers/admin");

const router = express.Router();

router.post("/signup", AdminController.createAdmin);

router.post("/login", AdminController.adminLogin);

module.exports = router;
