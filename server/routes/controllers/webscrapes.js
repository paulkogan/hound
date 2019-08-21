const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Energizer = require('../../models/energizer');
const router = express.Router();

//cors set on server.js

const webClient = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// scrape page
router.post('/', async (req, res) => {

  //console.log(`/Controllers/webscrape/req.body - ${JSON.stringify(req.body, null, 4)}`);
  const {
    firstName, lastName, wikiPage
  } = req.body.energizer;
  var wikiFound = {}

  try {
    console.log("SCRAPE CONTROLLER - wikiurl: ",wikiPage);
    const result = await webClient.get(wikiPage);
    const $ = cheerio.load(result.data)

    let birthPlaceText = $('.birthplace').text()
    let birthPlaceTitle = $('.birthplace').find('a').attr('title')

    let education= $('th:contains("Education")').next().text()
    let almaMater = $('th:contains("Alma")').next().text()
    let bornTown= $('th:contains("Born")').next().find('a').first().text()
    let bornState= $('th:contains("Born")').next().find('a').last().text()
    let ele= $('.mw-parser-output').find('#Early_life_and_education').parent().next().text()

    let earlyLife= $('.mw-parser-output').find('#Early_life').parent().next().text()
    let birthPlaceTown = "no match"
    let birthPlaceState = "no match"

  //early life ==============
    var bigEarly = $('.mw-parser-output').find('#Early_life').parent().nextUntil('h2', "p")
    //console.log("BIG EARLY: ");
    let bigEarlyText = ""
    $(bigEarly).each( function( index, element ){
            //console.log( $( this ).text() );
            bigEarlyText += $( this ).text()+"\n"
    });
    bigEarlyText = bigEarlyText.replace(/\[\d{1,2}\]/g, "");


//bio ==============
   var topBio = $('.mw-parser-output').find('p').eq(1).text()
   var topBio2 = $('.mw-parser-output').find('p').eq(1).nextUntil('div', 'p')

   //console.log("ALL ELEMENTS OF TOPBIO2: ");
   $(topBio2).each( function( index, element ){
           //console.log( $( this ).text() );
           topBio += "\n"+$( this ).text()
   });

   topBio = topBio.replace(/\[\d{1,2}\]/g, "");

    // console.log("BirthplaceText: ",birthPlaceText);
    // console.log("BirthplaceTitle: ",birthPlaceTitle);
    // console.log("Education: ",education);
    // console.log("Alma mater: ",almaMater);
    // console.log("bornTown: ",bornTown);
    // console.log("bornState: ",bornState);
    //console.log("ele: ",ele);
    //console.log("early_life: ",earlyLife);


    if (birthPlaceTitle && birthPlaceTitle.indexOf(",")>0 ) {
          let birthPlaceArr = birthPlaceTitle.split(",")
          birthPlaceTown = birthPlaceArr[0].trim() || "no match"
          birthPlaceState = birthPlaceArr[1].trim() || "no match"
    }


    if (bornTown && bornTown.indexOf(",")>0) {
        let bornArr = bornTown.split(",")
        bornTown = bornArr[0].trim()
        bornState = bornArr[1].trim()
    }

    wikiFound = {
                     birthPlaceTown,
                     birthPlaceState,
                     education,
                     almaMater,
                     bornTown,
                     bornState,
                     earlyLife: bigEarlyText|| earlyLife || ele || "no match",
                     bio: topBio
    }
    //console.log("wikiFound:  ", wikiFound);
    //return wikiFound -- need to return witha 200 status
    res.status(200).json({ message: 'OK wiki', wikiFound});
  } catch (err) {
    console.log('error getting wiki........');
    //console.log(err);
    res.status(422).json({ message: 'Unable to get wiki' });
    //res.status(422);
  }

});



module.exports = router;




    // var topBio = $('.mw-parser-output').find('.mw-empty-elt').nextUntil('div', 'p')
    // var topBio2 = $('.mw-parser-output').find('p').eq(0).nextUntil('div', 'p')
    // var topBio3 = $('.mw-parser-output').find('p').eq(1).nextUntil('div', 'p')
  //  var topBio3 = $('.mw-parser-output').find('.infobox biography vcard').nextUntil('.toc', 'p')



  //  var topBio3 = $('.mw-parser-output').find('p').eq(1).text()
    //console.log("TB - length: "+topBio.length)
    //console.log("TB2 - length: "+topBio2.length)
    //console.log("TB3 - length: "+topBio3.length)

    //console.log("top_Bio ",topBio);
    //console.log("top_Bio2 ",topBio2);
    //console.log("top_Bio3 ",topBio3);


    // console.log("ALL ELEMENTS OF TOPBIO: ");
    // $(topBio).each( function( index, element ){
    //         console.log( $( this ).text() );
    //         //bigEarlyText += $( this ).text()+"\n"
    // });









    // //let earlyLifePara= $('.mw-parser-output').find('#Early_life').parent().find('p').text()
    // let earlyLifePara= $('.mw-parser-output').find('#Early_life').parent().parent().find('p').text()
    // let earlyLifePara2= $('.mw-parser-output').find('#Early_life').parent().find('p').text()
    //
    // //$( "li.third-item" ).nextAll().
    // let earlyLifePara4=$('.mw-parser-output').children().find('h2').text()
    // let earlyLifePara5=$('.mw-parser-output').children().find('h2').nextAll().length
    // let earlyLifePara6=$('.mw-parser-output').children(). ('h2').length
    //



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

//console.log("early_life_para: ",earlyLifePara);
// console.log("early_life_para2: ",earlyLifePara2);
// console.log("early_life_para3: ",earlyLifePara3);
// console.log("early_life_para4: ",earlyLifePara4);
// console.log("early_life_para5: ",earlyLifePara5);
// console.log("early_life_para6: ",earlyLifePara6);
