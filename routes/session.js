const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    res.render('session', {
        title: 'Sessions'
    });
});

router.get('/:id', function (req, res) {
    res.render('test', {
        title: 'Test ' + req.params.id,
        id: req.params.id
    })
});


module.exports = router;
