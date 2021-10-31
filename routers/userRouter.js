const express = require("express");
const router = new express.Router();
const User = require("./../models/userSchema");
const auth = require("../auth");
const multer = require("multer");
const sharp = require("sharp");

router.post("/user", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

const profile = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/user/profile",
  auth,
  profile.single("profile"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.profile = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    if (user.profile == undefined) {
      throw new Error("No profile pic available");
    }
    res.set("Content-Type", "image/png");
    res.send(user.profile);
  } catch (e) {
    res.send("No Profile");
  }
});

module.exports = router;
