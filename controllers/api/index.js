const router = require('express').Router();
const userRoutes = require('./userRoutes');
const highScoreRoutes = require('./highScoreRoutes');

router.use('/users', userRoutes);
router.use('/scores', highScoreRoutes);

module.exports = router;
