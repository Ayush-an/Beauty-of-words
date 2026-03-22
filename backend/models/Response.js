const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true }
}, {
    timestamps: true
});

const Response = mongoose.model('Response', responseSchema);
module.exports = Response;
