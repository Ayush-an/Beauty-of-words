const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Healing', 'Comfort', 'Motivation']
    },
    text: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
