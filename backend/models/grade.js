const mongoose = require("mongoose");

const gradeSchema = mongoose.Schema({
  gradeNumber: { type: Number, min: 7, max: 12, required: true },
  gradeLiter: { type: String, required: true },
});

module.exports = mongoose.model("Grade", gradeSchema);
