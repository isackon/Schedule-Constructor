const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  teacherName: { type: String, required: true },
  teacherDepartment: { type: String, required: true }
});

module.exports = mongoose.model("Teacher", teacherSchema);
