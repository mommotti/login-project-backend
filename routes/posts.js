// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create a new post
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, text } = req.body;
    const image = req.file ? req.file.filename : null;

    const post = new Post({
      title,
      text,
      image,
      dateCreated: new Date(),
    });

    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send({ message: 'Failed to create post', error });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch posts', error });
  }
});

module.exports = router;
