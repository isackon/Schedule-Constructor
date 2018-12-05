const Grade = require("../models/grade");

exports.createGrade = (req, res, next) => {
  const grade = new Grade({
    gradeNumber: req.body.gradeNumber,
    gradeLiter: req.body.gradeLiter
  });
  grade.save().then(createdGrade => {
    console.log(createdGrade);
    res.status(201).json({
      message: "Grade added successfully",
      grades: {
        ...createdGrade,
        id: createdGrade._id
      }
      // gradeName: createdGrade.gradeName
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a grade failed!"
    });
  });
};

exports.updateGrade = (req, res, next) => {
  const grade = new Grade({
    _id: req.body.id,
    gradeNumber: req.body.gradeNumber,
    gradeLiter: req.body.gradeLiter
  });
  Grade.updateOne({ _id: req.params.id }, grade)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate grade!"
      });
    });
};

exports.getGrades = (req, res, next) => {
  Grade.find().then(documents => {
    res.status(200).json({
      message: "Grades fetched successfully!",
      grades: documents
    });
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching grades failed!"
      });
    });
};

exports.getGrade = (req, res, next) => {
  Grade.findById(req.params.id).then(grade => {
    if (grade) {
      res.status(200).json(grade);
    } else {
      res.status(404).json({ message: "Grade not found!" });
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching grade failed!"
      });
    });
};

exports.deleteGrade = (req, res, next) => {
  Grade.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting grades failed!"
      });
    });
};
