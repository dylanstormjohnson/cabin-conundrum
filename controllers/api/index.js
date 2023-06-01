const router = require('express').Router();
const userRoutes = require('./userRoutes');
const highScoreRoutes = require('./highScoreRoutes');
const gameRoutes = require('./gameRoutes')

router.use('/users', userRoutes);
router.use('/scores', highScoreRoutes);
router.use('/game', gameRoutes);

module.exports = router;
