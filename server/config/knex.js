const { Model } = require('objection');
const Knex = require('knex');
const {
  host, database, user, password, port,
} = require('./db-credentials.js');

const knex = Knex({
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    user,
    password,
    host,
    port,
    database,
  },
});

Model.knex(knex);

module.exports = knex;
