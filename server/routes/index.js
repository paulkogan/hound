const server = require('../server');



// Private API
const EnergizersController = require('./controllers/energizers');
const CurrentUserController = require('./controllers/current-user');
// Public APIs


// Middleware
//server.use('/', apiAuthorizationMiddleware);
//server.use('/api', currentUserMiddleware);

// Private Routes
server.use('/', EnergizersController);
server.use('/api/current-user', CurrentUserController);
server.use('/api/energizers', EnergizersController);


module.exports = server;
