const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('session', {
        title: 'Sessions'
    });
});

router.get('/:id', (req, res) => {
    res.render('test', {
        title: 'Test ' + req.params.id,
        id: req.params.id
    })
});


module.exports = router;
