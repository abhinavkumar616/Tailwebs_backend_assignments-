const Student = require('../models/student');

const getAllstudent = async (req, res) => {

  try {
    let data = await Student.find()
    return res.status(200).send({
      sessionId: req.sessionID,
      data: data
    })
  }
  catch (error) {
    return res.status(500).send({
      error: error.message,
      message: "Internal Server Error"
    })
  }

}

const createNewStudent = async (req, res) => {
  try {
    const { name, subject, marks } = req.body;

    if (!name || !subject || !marks) {
      return res.status(400).send({
        message: "Kindly Provide all details"
      })
    }

    let findStudent = await Student.findOne({ name, subject })
    if (findStudent) {
      findStudent.marks = findStudent.marks + marks
      findStudent.save()
      return res.status(200).send({
        message: 'Student marks updated successfully'
      })
    }
    const newStudent = new Student({ name, subject, marks });
    newStudent.save()
    return res.status(201).send({
      message: 'New student added successfully'
    })
  }
  catch (error) {
    return res.status(500).send({
      error: error.message,
      message: "Internal Server Error"
    })
  }
}

const updateStudent = async (req, res) => {

  try {
    const { name, subject, marks } = req.body;

    let id = req.params.id

    if (! await Student.findOne({ _id: id })) {
      return res.status(404).send({
        message: "Records not Found in Database"
      })
    }

    let updateData = await Student.findByIdAndUpdate(id, { name, subject, marks }, { new: true })
    return res.status(200).send({
      message: "Records Updated Successfully",
      data: updateData
    })
  }
  catch (error) {
    return res.status(500).send({
      error: error.message,
      message: "Internal Server Error"
    })
  }

}

const deleteStudent = async (req, res) => {
  try {

    let id = req.params.id

    if (! await Student.findOne({ _id: id })) {
      return res.status(404).send({
        message: "Records not Found in Database"
      })
    }
    let deleteData = await Student.findByIdAndDelete(id)
    return res.status(200).send({
      status: true,
      message: "Records Deleted Successfully"
    })
  }
  catch (error) {
    return res.status(500).send({
      error: error.message,
      message: "Internal Server Error"
    })
  }

}


module.exports = {
  getAllstudent,
  createNewStudent,
  updateStudent,
  deleteStudent
}