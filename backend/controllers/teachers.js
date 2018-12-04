const Teacher = require("../models/teacher");

exports.createTeacher = (req, res, next) => {
  const teacher = new Teacher({
    teacherName: req.body.teacherName,
    teacherDepartment: req.body.teacherDepartment
  });
  teacher.save().then(createdTeacher => {
    console.log(createdTeacher);
    res.status(201).json({
      message: "Teacher added successfully",
      teachers: {
        ...createdTeacher,
        id: createdTeacher._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a teacher failed!"
    });
  });
};

exports.updateTeacher = (req, res, next) => {
  const teacher = new Teacher({
    _id: req.body.id,
    teacherName: req.body.teacherName,
    teacherDepartment: req.body.teacherDepartment
  });
  Teacher.updateOne({ _id: req.params.id }, teacher)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate teacher!"
      });
    });
};

exports.getTeachers = (req, res, next) => {
  Teacher.find().then(documents => {
    res.status(200).json({
      message: "Teachers fetched successfully!",
      teachers: documents
    });
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching teachers failed!"
      });
    });
};

exports.getTeacher = (req, res, next) => {
  Teacher.findById(req.params.id).then(teacher => {
    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res.status(404).json({ message: "Teacher not found!" });
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching teacher failed!"
      });
    });
};

exports.deleteTeacher = (req, res, next) => {
  Teacher.deleteOne({ _id: req.params.id })
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
        message: "Deleting teachers failed!"
      });
    });
};
