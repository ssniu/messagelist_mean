const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('index page');
    //res.render('index');
});

module.exports = router;
