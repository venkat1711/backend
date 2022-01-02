const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const registerpostSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        allpostId: {
            type: ObjectId,
            ref: 'Allpost',
            required: true,
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model('RegisterPost', registerpostSchema);
