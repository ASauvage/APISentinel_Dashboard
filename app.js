require('dotenv').config();

const express = require('express');
const app = express();

// routes definitions
app.use('/', require('./routes/default'));
app.use('/session', require('./routes/session'));

app.get('*', function (req, res) {
    res.send('404 error');
});


app.listen(process.env.SRV_PORT, function () {
    console.log('Server is running on port ' + process.env.SRV_PORT)
});
