const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        required: true
    },
    note: {
        type: String
    }
}, {
    timestamps: true
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
