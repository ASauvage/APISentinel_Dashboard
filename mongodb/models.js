const mongoose = require('mongoose')


const api_tester_schema = new mongoose.Schema({
    title: {type: String, required: true},
    test_info: {
        session_id: {type: String, required: true},
        service: {type: String, required: true},
        env: {type: String, required: true},
        tags: {type: Array, required: true},
        version: {type: String, required: true}
    },
    url: {type: String, required: true},
    headers: {type: Object, required: true},
    params: {type: Object, required: true},
    status: {type: Boolean, required: true},
    errors_list: {type: Array, required: true},
    api_response: {type: String},
    timestamp: {type: Number, required: true}
});


module.exports = mongoose.model("tests", api_tester_schema);
