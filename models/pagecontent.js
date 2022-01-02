const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('PageContent', pageContentSchema);
