const express = require('express');
const router = express.Router();
const User = require('../../models/Users');

// @route   GET api/users
// @desc    Get the list of users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users
// @desc    Create a new user
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/:username
// @desc    Update an user
// @access  Public
router.put('/:username', async (req, res) => {
  const { email } = req.body;

  try {
      let user = await User.findOne({ username: req.params.username });

      if (!user) {
          return res.status(404).json({ msg: 'User not found' });
      }

      user.email = email;
      await user.save();

      res.json({ msg: `User '${req.params.username}' email updated`, user });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// @route   DELETE api/users/:username
// @desc    Delete an user
// @access  Public
router.delete('/:username', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username });

    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: `User '${req.params.username}' deleted`, user });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

module.exports = router;