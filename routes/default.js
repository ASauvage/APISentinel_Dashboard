const express = require('express');
const api_tester = require('../mongodb/models')

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const sessions = await api_tester.find()

        res.render('index', {
            title: 'Homepage',
            sessions: sessions
        });
    } catch (error) {
        res.status(500).render('error', {
            status_code: 500,
            error: error
        })
    }
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
