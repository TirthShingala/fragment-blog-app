const express = require("express");
const router = new express.Router();
const Blog = require("./../models/blogSchema");
const auth = require("../auth");

router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find({}).populate("owner");
  res.send(blogs);
});

router.get("/blog", async (req, res) => {
  try {
    const blog = await Blog.findById(req.query.id).populate("owner");
    res.send(blog);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/blog", auth, async (req, res) => {
  const blog = new Blog({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await blog.save();
    res.status(201).send(blog);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/blog/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      res.status(404).send();
    }

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/blog/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send();
    }

    updates.forEach((update) => (blog[update] = req.body[update]));
    await blog.save();
    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
