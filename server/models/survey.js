let mongoose = require('mongoose');

// create a model class
let bookModel = mongoose.Schema({
   type: 'string',
   question: 'string',
   option1: 'string',
   option2: 'string',
   option3: 'string',
   option4: 'string'

});

module.exports = mongoose.model('questions', bookModel);

