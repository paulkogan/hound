const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Energizer = require('../../models/energizer');
const router = express.Router();

// 'crossOrigin': true,
// 'crossDomain': true,
// 'Access-Control-Allow-Origin' : '*',
// 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'


const webClient = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// create energizer
router.post('/', async (req, res) => {
  const {
    firstName, lastName, occupation, wikiPage, homeState, homeTown
  } = req.body.energizer;

  //console.log(`/Controllers/webscrape/req.body - ${JSON.stringify(req.body, null, 4)}`);


  try {
    console.log("SCRAPE CONTROLLER - wikiurl: ",wikiPage);
    const result = await webClient.get(wikiPage);
    const $ = cheerio.load(result.data)

    let birthPlaceText = $('.birthplace').text()
    let birthPlaceTitle = $('.birthplace').find('a').attr('title')

    let education= $('th:contains("Education")').next().text()
    let bornTown= $('th:contains("Born")').next().find('a').first().text()
    let bornState= $('th:contains("Born")').next().find('a').last().text()
    let elf= $('.mw-parser-output').find('#Early_life_and_education').parent().next().text()
    let earlyLife= $('.mw-parser-output').find('#Early_life').parent().next().text()
    //let earlyLifePara= $('.mw-parser-output').find('#Early_life').parent().find('p').text()
    let earlyLifePara= $('.mw-parser-output').find('#Early_life').parent().parent().find('p').text()
    let earlyLifePara2= $('.mw-parser-output').find('#Early_life').parent().find('p').text()
    let earlyLifePara3= $('.mw-parser-output').find('#Early_life').parent().next().text()
    console.log("Birthplace: ",birthPlaceText);
    console.log("ED: ",education);
    console.log("bornTown: ",bornTown);
    console.log("bornState: ",bornState);
    console.log("elf: ",elf);
    console.log("early_life: ",earlyLife);
    console.log("early_life_para: ",earlyLifePara);
    console.log("early_life_para2: ",earlyLifePara2);
    console.log("early_life_para3: ",earlyLifePara3);
  } catch (err) {
    console.log('error........');
    console.log(err);
    res.status(422).json({ message: 'Unable to get wiki' });
  }
  res.status(200).json({ message: 'new provider ok' });
});




// update energizer
router.post('/update', async (req, res) => {
  const {
    id, firstName, lastName, occupation, wikiPage, homeState, homeTown
  } = req.body;

console.log(`/Controllers/energizers/UPDATE  - ${JSON.stringify(req.body, null, 4)}`);

  try {
    const provider = await Energizer.update({
      id,
      firstName,
      lastName,
      occupation,
      wikiPage,
      homeState,
      homeTown
    });

  } catch (err) {
    console.log('error........');
    console.log(err);
    res.status(422).json({ message: 'Unable to update Energizer' });
  }

  res.status(200).json({ message: 'updated energizer ok' });
});






module.exports = router;




// //let elf1= $('#Early_life_and_education').parents().closest('div').text()
// $('#Early_life_and_education').parents().each((i, elem) => {
//           // console.log('parent text ',i,$(this).text())
//           // console.log('parent html ', $(this).html())
//           // console.log('parent class ',$(this).attr('class'))
//           // console.log('string class ',i,$(this).toString())
//           // console.log('DATA', $(this).data)
//           // console.log($(this).name)
//           console.log("ELEM", i, elem.name)
// } )
// let elf3= $('#Early_life_and_education').text()
// $('#Early_life_and_education').nextAll().each((i, elem) => {
//           console.log('next '+i+' '+$(this).html()+' '+$(this).attr('class'))
//
// } )
// let elf5= $('p').text()
// let elf6= $('.mw-parser-output').find('#Early_life_and_education').next().next().text()
// let elf7= $('.mw-parser-output').find('#toc').next().next().text()
// console.log("IN webscrape controller, ELF:", elf)
// //console.log("IN webscrape controller, closesst div ELF1:", elf1)
// //console.log("IN webscrape controller, parents ELF2:", elf2)
// console.log("IN webscrape controller, ELF3:", elf3)
// //console.log("IN webscrape controller, nextAll ELF4:", elf4)
// console.log("IN webscrape controller, ELF5:", elf5)
// console.log("from mw ELF6:", elf6)
// console.log("from mw toc ELF7:", elf7)
