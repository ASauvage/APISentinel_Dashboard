const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', {
        title: 'Homepage',
        sessions: [{session_id: "250211-114807-25er623f"}, {session_id: "250211-114807-266e951a"}, {session_id: "250211-114807-59qe84rt"}]
    });

});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

router.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    });
});


module.exports = router;
