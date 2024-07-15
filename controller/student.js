const Student = require('../models/student');
const userModel = require('../models/user');

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

    // console.log("req.session.userId in student controllers",req.session.userId);
    // return
    let findUserId=await userModel.findOne({_id:req.session.userId})
    console.log("findUserId:::::::",findUserId);
    // return
    let findStudent = await Student.findOne({ name, subject })
    console.log("findStudent",findStudent);
    
    // return
    if (findStudent) {
      let findStudent_creator=findStudent.creator.toString()
      if(findStudent_creator !== req.session.userId){
        return res.status(404).send({
          status:"Fail",
          message:"You are not Authorized to update the Marks"
        })
      }
      findStudent.marks = findStudent.marks + marks
      findStudent.save()
      return res.status(200).send({
        message: 'Student marks updated successfully'
      })
    }

    const newStudent = new Student({ name, subject, marks, creator:req.session.userId });
    await newStudent.save()
    // await newStudent.created_student_id.push(findStudent._id)
    findUserId.created_student_id.push(newStudent._id)
    await findUserId.save()

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