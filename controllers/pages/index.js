const router = require('express').Router();
const path = require('path');
const withAuth = require('../../middleware/auth');

const profile = require('./profile');
const home = require('./home');
const login = require('./login');
const game = require('./game')
const highscores = require('./highscores');

router.use('/profile', withAuth, profile);

router.use('/home', withAuth, home);

router.use('/highscores', withAuth, highscores);

router.use('/login', login);

//need to add withAuth to line below
router.use('/game', game);

router.get('/', (req, res) => {
  return res.render('welcome');
});

module.exports = router;
