require('dotenv').config();

const express = require('express');
const api_tester = require('../mongodb/models');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const services = await api_tester.distinct('test_info.service', {'test_info.version': process.env.APT_VERSION})
        const sessions = await api_tester.aggregate([
            {
                $match: {
                   "test_info.version": process.env.APT_VERSION
                }
            },
            {
                $group: {
                    _id: "$test_info.session_id",
                    timestamp: { $max: "$timestamp" }
                }
            },
            {
                $sort: { timestamp: -1 }
            },
            {
                $limit: 20
            },
            {
                $project: {
                    session_id: "$_id",
                    _id: 0
                }
            }
        ]);

        console.log(services);
        console.log(sessions);
        

        res.render('index', {
            title: 'Homepage',
            services: services,
            sessions: sessions
        });
    } catch (error) {
        res.status(500).render('error', {
            status_code: 500,
            error: error
        });
    }
});

router.get('/about', (req, res) => {
    try {
        res.render('about', {
            title: 'About'
        });
    } catch (error) {
        res.status(500).render('error', {
            status_code: 500,
            error: error
        });
    }
});

router.get('/help', (req, res) => {
    try {
        res.render('help', {
            title: 'Help'
        });
    } catch (error) {
        res.status(500).render('error', {
            status_code: 500,
            error: error
        });
    }
});


module.exports = router;
