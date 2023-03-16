const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }]
});

module.exports = mongoose.model('Form', formSchema);
