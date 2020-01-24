const express = require('express');
const Energizer = require('../../models/energizer');
const XLSX = require('xlsx')
const router = express.Router();
//const multer = require('multer');
const fileUpload = require('express-fileupload');

//cors set on server.js




// read upload list 
router.post('/', async (req, res) => {


  console.log("IN UPLOAD CONTROLLER", req.files.englist);
  newFile = req.files.englist
  console.log("Dir is ", process.cwd());
  console.log("Dir2 is ", __dirname);
  let filePath2 = process.cwd() + '/EnzList.xlsx'
  console.log(filePath2);
  var workbook = XLSX.readFile(filePath2);
  var sheet_name_list = workbook.SheetNames; 
  console.log("Sheetnames", sheet_name_list.toString());
  let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); 
  console.log(data);

  var uploadListContents = {}

  try {
    console.log("We found this in upload list: "+ newFile.name);
    
    res.status(200).send({ message: 'OK upload, got: '+ newFile.name});
 
  } catch (err) {
    console.log('error eeading upload list........');
    //console.log(err);
    res.status(422).json({ message: 'Unable to read uploaded list' });
    //res.status(422);
  }

});


module.exports = router;
