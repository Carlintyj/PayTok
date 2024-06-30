const express = require('express');
const router = express.Router();
const Agent = require('../../models/Agent');

// @route   GET api/agents
// @desc    Get the list of agents
// @access  Public
router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/agents/:username
// @desc    Get an agent by username
// @access  Public
router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const agent = await Agent.findOne({ username });

    if (!agent) {
        return res.status(404).json({ msg: 'Agent not found' });
    }

    res.json(agent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/agents
// @desc    Create a new agent
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    await newAgent.save();
    res.json(newAgent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/agents/:username
// @desc    Update an agent
// @access  Public
router.put('/:username', async (req, res) => {
  const { email } = req.body;

  try {
      let agent = await Agent.findOne({ username: req.params.username });

      if (!agent) {
          return res.status(404).json({ msg: 'Agent not found' });
      }

      agent.email = email;
      await agent.save();

      res.json({ msg: `Agent '${req.params.username}' email updated`, agent });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// @route   DELETE api/agents/:username
// @desc    Delete an agent
// @access  Public
router.delete('/:username', async (req, res) => {
  try {
    const agent = await Agent.findOneAndDelete({ username: req.params.username });

    if (!agent) {
        return res.status(404).json({ msg: 'Agent not found' });
    }

    res.json({ msg: `Agent '${req.params.username}' deleted`, agent });
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

module.exports = router;