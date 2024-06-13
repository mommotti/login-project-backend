// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String }, // Store image filename
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
