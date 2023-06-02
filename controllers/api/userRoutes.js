const router = require('express').Router();
const { User } = require('../../models');

// register
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({
      where: { username },
    });

    // prevent user from registering with same username
    if (existingUser)
      return res
        .status(400)
        .json({ message: 'User already exist, chose a new username' });

    // check if passwords length > 8
    if (password.length < 8)
      return res
        .status(400)
        .json({ message: 'Password must be greater or equal to 8 characters' });

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

// update username
router.put('/username/:id', async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ message: 'Username cannot be empty' });
      return;
    }

    const userData = await User.findOne({
      where: { username },
    });

    if (userData) {
      res
        .status(400)
        .json({ message: 'Username already exists, use a different one' });
      return;
    }

    await User.update(
      { username },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.json({ message: 'Username updated successfully!' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update password
router.put('/password/:id', async (req, res) => {
  try {
    const { password } = req.body;

    // check if passwords length > 8
    if (password.length < 8)
      return res
        .status(400)
        .json({ message: 'Password must be greater or equal to 8 characters' });

    await User.update(
      { password },
      {
        where: {
          id: req.params.id,
        },
        individualHooks: true,
      }
    );

    res.json({ message: 'password updated successfully!' });
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
