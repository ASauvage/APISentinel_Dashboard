const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    res.send('Session homepage');
});

router.get('/:id', function (req, res) {
    res.send('test: ' + req.params.id);
});


module.exports = router;
