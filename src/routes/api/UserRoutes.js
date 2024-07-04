const express = require("express");
const router = express.Router();
const User = require("../../models/Users");

// @route   GET api/users
// @desc    Get the list of users
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/:uid
// @desc    Get an user by uid
// @access  Public
router.get("/uid/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/:account
// @desc    Get an user by account
// @access  Public
router.get("/account/:account", async (req, res) => {
  try {
    const user = await User.findOne({ account: req.params.account });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/users
// @desc    Create a new user
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users/:uid/role
// @desc    Update an user role
// @access  Public
router.put("/:uid/role", async (req, res) => {
  try {
    let user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.role = "agent";
    await user.save();
    res.json({ msg: `User '${req.params.uid}' role is updated, user` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users/:uid/pin
// @desc    Update an user pin
// @access  Public
router.put("/:uid/pin", async (req, res) => {
  const { pin } = req.body;

  try {
    let user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.pin = pin;
    await user.save();
    res.json({ msg: `User '${req.params.uid}' pin is updated, user` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users/:uid/balance
// @desc    Update an user balance
// @access  Public
router.put("/:uid/balance", async (req, res) => {
  const { balance } = req.body;

  try {
    let user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.balance = balance;
    await user.save();
    res.json({ msg: `User '${req.params.uid}' balance is updated, user` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/users/:uid
// @desc    Delete an user
// @access  Public
router.delete("/:uid", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: `User '${req.params.uid}' deleted, user` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
