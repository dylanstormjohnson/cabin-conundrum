const router = require('express').Router();
const { HighScore } = require('../../models');

// add scores
router.post('/', async (req, res) => {
  try {
    // req.body = {user_id, time}
    const score = await HighScore.create(req.body);
    res.json(score);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
