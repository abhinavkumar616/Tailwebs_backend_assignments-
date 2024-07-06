const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../middleware/auth');
const { getAllstudent, createNewStudent, updateStudent, deleteStudent } = require('../controller/student');

// router.get("/",ensureAuthenticated,getAllstudent)
router.get("/",getAllstudent)
router.post('/',createNewStudent)
router.put('/:id', updateStudent)
router.delete('/:id',deleteStudent)



module.exports = router;
