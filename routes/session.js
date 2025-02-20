const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    res.render('layout.ejs', {
        title: 'Sessions',
        layout: './session.ejs'
    });
});

router.get('/:id', function (req, res) {
    res.render('layout.ejs', {
        title: 'Test ' + req.params.id,
        layout: './test.ejs',
        id: req.params.id,
    })
});


module.exports = router;
