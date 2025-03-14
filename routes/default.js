const express = require('express');
const api_tester = require('../mongodb/models');
const { APS_VERSIONS } = require('../mongodb/data');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const services = await api_tester.aggregate([
            { $match: { 'test_info.version': { $in: APS_VERSIONS } } },
            { $sort: { timestamp: -1 } },
            { $limit: 1000 },
            { $group: { _id: '$test_info.service', count: { '$sum': 1 }, timestamp: { $max: '$timestamp' } } },
            { $sort: { timestamp: -1 } },
            { $project: { timestamp: 0 } }
        ]);
        const sessions = await api_tester.aggregate([
            { $match: { 'test_info.version': { $in: APS_VERSIONS } } },
            { $group: { _id: '$test_info.session_id', timestamp: { $max: '$timestamp' } } },
            { $sort: { timestamp: -1 } },
            { $limit: 20 },
            { $project: { timestamp: 0 } }
        ]);

        res.render('homepage', {
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
            title: 'About',
            aps_versions: APS_VERSIONS
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
