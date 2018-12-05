const mongoose = require("mongoose");

const gradeSchema = mongoose.Schema({
  gradeNumber: { type: String, required: true },
  gradeLiter: { type: String, required: true },
});

module.exports = mongoose.model("Grade", gradeSchema);
