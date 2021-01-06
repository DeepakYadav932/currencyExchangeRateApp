const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String
    },
    abbrevation: {
        type: String
    }
});

module.exports = mongoose.model('Currency', schema);