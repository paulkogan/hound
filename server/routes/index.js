const server = require('../server');

// Private API
const EnergizersController = require('./controllers/energizers');
const CurrentUserController = require('./controllers/current-users');
const WebScrapeController = require('./controllers/webscrapes');
// Public APIs


// Middleware
//server.use('/', apiAuthorizationMiddleware);
//server.use('/api', currentUserMiddleware);

// Private Routes
//server.use('/list', EnergizersController);
server.use('/api/current-user', CurrentUserController);
server.use('/api/energizers', EnergizersController);
server.use('/api/webscrape', WebScrapeController);

module.exports = server;
