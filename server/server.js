const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());


module.exports = server;


//
// if (process.env.NODE_ENV === 'production') {
//   server.use(cors({
//     origin(origin, callback) {
//       const whitelist = [
//         process.env.PATIENTS_URL,
//         process.env.PRACTICE_MANAGEMENT_URL,
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
