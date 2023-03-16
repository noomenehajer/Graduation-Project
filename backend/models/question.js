const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['checkbox', 'multiple', 'short', 'paragraph'],
    required: true
  },
  options: [String],
  form: {
    type: Schema.Types.ObjectId,
    ref: 'Form'
  }
});

module.exports = mongoose.model('Question', questionSchema);
