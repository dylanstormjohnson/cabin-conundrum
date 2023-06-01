const router = require('express').Router();
const { HighScore, User } = require('../../../models');

// get all scores
router.get('/', async (req, res) => {
  try {
    const scores = await HighScore.findAll({
      attributes: ['id', 'user_id', 'time'],
      order: [['time', 'ASC']],
      include: [{ model: User, attributes: ['username'] }],
      limit: 5,
    });
    const highScores = scores.map((s) => s.get({ plain: true }));

    res.render('highscores', {
      logged_in: req.session.logged_in,
      highScores,
    });
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
