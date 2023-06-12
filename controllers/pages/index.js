const router = require('express').Router();
const path = require('path');
const withAuth = require('../../middleware/auth');

const profile = require('./profile');
const login = require('./login');
const game = require('./game')
const highscores = require('./highscores');

router.use('/profile', withAuth, profile);

router.use('/highscores', withAuth, highscores);

router.use('/login', login);

router.use('/game', withAuth, game);

router.get('/', (req, res) => {
  res.render('welcome', { logged_in: req.session.logged_in });
});

module.exports = router;
