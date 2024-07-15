const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middleware/auth');
const { getAllstudent, createNewStudent, updateStudent, deleteStudent } = require('../controller/student');

// router.get("/getAll",ensureAuthenticated,getAllstudent)
router.get("/getAll",getAllstudent)
// router.post('/create',createNewStudent)
router.post('/create',ensureAuthenticated,createNewStudent)
router.put('/update/:id', updateStudent)
router.delete('/delete/:id',deleteStudent)



module.exports = router;
