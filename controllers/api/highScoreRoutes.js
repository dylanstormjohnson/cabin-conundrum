const router = require('express').Router();
const { HighScore, User } = require('../../models');

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

// get all scores
router.get('/', async (req, res) => {
  try {
    const scores = await HighScore.findAll({
      attributes: ['id', 'user_id', 'time'],
      include: [{ model: User, attributes: ['username'] }],
    });
    const higScores = scores.map((s) => s.get({ plain: true }));
    res.json(higScores);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// get specific user scores
router.get('/:userId', async (req, res) => {
  try {
    const scores = await HighScore.findAll({
      where: { user_id: req.params.userId },
      attributes: ['id', 'user_id', 'time'],
      include: [{ model: User, attributes: ['username'] }],
    });
    const userScores = scores.map((s) => s.get({ plain: true }));
    res.json(userScores);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
