const mongoose = require('mongoose');

const genereSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
      unique:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Genere', genereSchema);
