const mongoose = require('mongoose');

const masterpieceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['word', 'quote', 'poem']
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Masterpiece = mongoose.model('Masterpiece', masterpieceSchema);
module.exports = Masterpiece;
