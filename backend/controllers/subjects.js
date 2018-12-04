const Subject = require("../models/subject");

exports.createSubject = (req, res, next) => {
  const subject = new Subject({
    subjectName: req.body.subjectName
  });
  subject.save().then(createdSubject => {
    console.log(createdSubject);
    res.status(201).json({
      message: "Subject added successfully",
      subjects: {
        ...createdSubject,
        id: createdSubject._id
      }
      // subjectName: createdSubject.subjectName
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a subject failed!"
    });
  });
};

exports.updateSubject = (req, res, next) => {
  const subject = new Subject({
    _id: req.body.id,
    subjectName: req.body.subjectName
  });
  Subject.updateOne({ _id: req.params.id }, subject)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate subject!"
      });
    });
};

exports.getSubjects = (req, res, next) => {
  Subject.find().then(documents => {
    res.status(200).json({
      message: "Subjects fetched successfully!",
      subjects: documents
    });
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching subjects failed!"
      });
    });
};

exports.getSubject = (req, res, next) => {
  Subject.findById(req.params.id).then(subject => {
    if (subject) {
      res.status(200).json(subject);
    } else {
      res.status(404).json({ message: "Subject not found!" });
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching subject failed!"
      });
    });
};

exports.deleteSubject = (req, res, next) => {
  Subject.deleteOne({ _id: req.params.id })
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
        message: "Deleting subjects failed!"
      });
    });
};
