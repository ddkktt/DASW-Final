const mongoose = require('mongoose');
const config = require('../config/config.js');



mongoose.connect(config.dbUrl(), {
    useNewUrlParser: true
}).then(() => {
    console.log("connected to db");
}).catch(err => console.log("Not connected to db"));

module.exports = {mongoose}