//require('express');
//require('dotenv').config();

const server = require('./server');

require('./routes');
require('./config/knex');

module.exports = server;




// require('express');
// require('dotenv').config();
// const server = require('./server');
// require('./routes');
// require('./config/knex');
// module.exports = server;
