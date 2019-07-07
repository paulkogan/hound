require('dotenv').config();

const env = process.env.NODE_ENV;
const version = process.env.VERSION;

console.log('IN DB Cred - NODE_ENV is: ',env)

let host = process.env.DEV_HOST;
let database = process.env.DEV_DATABASE;
let user = process.env.DEV_USER;
let password = process.env.DEV_PASSWORD;
let port = process.env.DEV_PORT || 5432;


if (env === 'production') {

  host = process.env.PROD_HOST;
  database = process.env.PROD_DATABASE;
  user = process.env.PROD_USER;
  password = process.env.PROD_PASSWORD;
  port = process.env.PROD_PORT || 5432;
}



module.exports = {
  host, database, user, password, port, env, version
};
