const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    res.render('index', {
        title: 'Homepage'
    });

});

router.get('/about', function (req, res) {
    res.render('about', {
        title: 'About'
    });
});

router.get('/help', function (req, res) {
    res.render('help', {
        title: 'Help'
    });
});



module.exports = router;
