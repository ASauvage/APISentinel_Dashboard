const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    res.render('layout.ejs', {
        title: 'Homepage',
        layout: 'index.ejs',
    });

});

router.get('/about', function (req, res) {
    res.render('layout.ejs', {
        title: 'About',
        layout: 'about.ejs'
    });
});

router.get('/help', function (req, res) {
    res.render('help.ejs', {
        title: 'Help',
        layout: 'help.ejs'
    });
});



module.exports = router;
