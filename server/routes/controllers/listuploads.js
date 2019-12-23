const express = require('express');
const Energizer = require('../../models/energizer');
const router = express.Router();

//cors set on server.js


// read upload list 
router.post('/', async (req, res) => {

  console.log("IN UPLOAD CONTROLLER", req);
    //   const {
  //console.log(req);
//   const {
//     firstName, lastName, wikiPage
//   } = req.body;

  var uploadListContents = {}

  try {
    console.log("We found this in upload list: ");
    res.status(200).send({ message: 'OK upload' });
 
  } catch (err) {
    console.log('error eeading upload list........');
    //console.log(err);
    res.status(422).json({ message: 'Unable to read uploaded list' });
    //res.status(422);
  }

});


module.exports = router;
