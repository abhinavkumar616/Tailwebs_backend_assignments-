const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Student', StudentSchema);
