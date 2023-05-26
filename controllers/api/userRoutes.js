const router = require('express').Router();
const { User } = require('../../models');

// register
router.post('/', async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });

    // prevent user from registering with same username
    if (existingUser)
      return res
        .status(400)
        .json({ message: 'User already exist, chose a new username' });

    // req.body = {username, password}
    const userData = await User.create(req.body);

    req.session.user_id = userData.id;
    req.session.username = userData.username;
    req.session.logged_in = true;

    res.status(200).json(userData);

    // res.render("home",{userData, logged_in:req.session.logged_in})
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.user_id = userData.id;
    req.session.username = userData.username;
    req.session.logged_in = true;

    res.json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    console.log(err);
    res.status(404).end();
  }
});

module.exports = router;
