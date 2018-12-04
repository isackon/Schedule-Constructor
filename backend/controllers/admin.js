const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");

exports.createAdmin = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const admin = new Admin({
      login: req.body.login,
      password: hash
    });
    console.log(admin);
    admin
      .save()
      .then(result => {
        res.status(201).json({
          message: "Admin created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}

exports.adminLogin = (req, res, next) => {
  let fetchedAdmin;
  Admin.findOne({ email: req.body.email })
    .then(admin => {
      if (!admin) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedAdmin = admin;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { login: fetchedAdmin.login, adminId: fetchedAdmin._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedAdmin._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}
