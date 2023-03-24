const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['checkbox', 'radio', 'text', 'textarea'], required: true },
  options: [String],
});

module.exports = mongoose.model('Question', questionSchema);
