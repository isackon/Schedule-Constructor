const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const subjectsRoutes = require("./routes/subjects");
const teachersRoutes = require("./routes/teachers");
const gradesRoutes = require("./routes/grades");

const app = express();

mongoose
  .connect(
    "mongodb+srv://islamsv:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0-6pgsu.mongodb.net/ScheduleConstructor"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/admin", adminRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/teachers", teachersRoutes);
app.use("/api/grades", gradessRoutes);

module.exports = app;
