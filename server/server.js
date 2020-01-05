const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const server = express();
const fileUpload = require('express-fileupload');


server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(fileUpload());

module.exports = server;

server.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
});

//let frontEndURL = process.env.FRONTEND_URL
//console.log(`Front End URL is ... ${frontEndURL}`);

//this does not really work
// if (process.env.NODE_ENV === 'production') {
//   server.use(cors({
//     origin(origin, callback) {
//       const whitelist = [
//         frontEndURL,
//       ];
//
//       if (!origin || whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         console.log(`Origin is... ${origin}`);
//         callback(new Error('CORS Error'));
//       }
//     },
//     credentials: true,
//   }));
// }
