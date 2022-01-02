const mongoose = require('mongoose');

const fragmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 64,
            unique: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Fragment', fragmentSchema);