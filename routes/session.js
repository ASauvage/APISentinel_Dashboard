const express = require('express');
const api_tester = require('../mongodb/models');
const { APS_VERSIONS } = require('../mongodb/data');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let results;
        
        if (Object.keys(req.query).length > 0) {
            results = await api_tester.find({
                'test_info.version': { $in: APS_VERSIONS },
                ...(req.query.session_id && req.query.session_id != '' && { 'test_info.session_id': req.query.session_id }),
                ...(req.query.service && req.query.service != '' && { 'test_info.service': req.query.service }),
                ...(req.query.status && req.query.status != '' && { 'status': (req.query.status === 'true') }),
                ...(req.query.env && req.query.env != '' && { 'test_info.env': req.query.env })
            }, {'api_response': 0}).sort({'timestamp': -1, 'title': -1}).limit(30);
        } else {
            results = await api_tester.find({'test_info.version': { $in: APS_VERSIONS }}, {'api_response': 0}).sort({'timestamp': -1, 'title': -1}).limit(30);
        }

        res.render('session', {
            title: 'Sessions',
            query: req.query,
            results: results
        });
    } catch (error) {
        res.status(500).render('error', {
            status_code: 500,
            error: error
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await api_tester.findById(req.params.id)

        res.render('test', {
            title: result.title,
            result: result
        });
    } catch (error) {
        res.status(500).render('error', {
            status_code: 500,
            error: error
        });
    }
});


module.exports = router;
