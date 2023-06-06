const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.render('game', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
