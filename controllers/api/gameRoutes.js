const router = require('express').Router();

router.get('/', (req, res) => {

req.render('game')

})

module.exports = router;