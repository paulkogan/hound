require('dotenv').config();

const host = process.env.PGHOST;
let database = process.env.PGDATABASE;
const user = process.env.PGUSER;
const password = process.env.PGPASSWORD;
const port = process.env.PGPORT || 5432;

if (process.env.NODE_ENV === 'production') {
  database = 'houndDB';
}

if (process.env.NODE_ENV === 'development') {
  database = 'houndDB';
}

if (process.env.NODE_ENV === 'test') {
  database = 'houndDB';
} else {
  database = 'houndDB';
}

module.exports = {
  host, database, user, password, port,
};
