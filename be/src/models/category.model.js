const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
