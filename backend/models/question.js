const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['checkbox', 'radio', 'text', 'textarea'], required: true },
  options: [{ type: String }],
});

module.exports = mongoose.model('Question', questionSchema);
