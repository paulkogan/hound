require('dotenv').config();

const { Client } = require('pg');
//const DatabaseCleaner = require('database-cleaner');
const knex = require('../config/knex');
const {
  host, database, user, password, port,
} = require('../config/db-credentials.js');

jest.setTimeout(1000)

// const databaseCleaner = new DatabaseCleaner('postgresql', {
//   postgresql: {
//     strategy: 'truncation',
//     skipTables: ['knex_migrations', 'knex_migrations_lock'],
//   },
// });
//
// const cleanDatabase = async () => new Promise((resolve, reject) => {
//   const dbClient = new Client({
//     host, user, database, password, port,
//   });
//   dbClient.connect()
//     .then(() => {
//       databaseCleaner.clean(dbClient, () => {
//         dbClient.end();
//         resolve();
//       });
//     })
//     .catch((err) => {
//       dbClient.end();
//       reject(err);
//     });
// });

beforeEach(() => {
// this was a problem - not calling timeouts
  jest.clearAllMocks();
//   // cleanDatabase()
//   //   .then(() => {
//   //     done();
//     // }).catch((err) => {
//     //   console.error(err);
//     //   done();
// });
});
//
// afterAll((done) => {
//   knex.destroy(done);
// });
