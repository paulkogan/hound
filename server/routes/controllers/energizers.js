const express = require('express');
const Energizer = require('../../models/energizer');
const router = express.Router();
require('dotenv').config();

function mapEnz (energizer) {
   return {
    id: energizer.id,
    firstName: energizer.first_name,
    middleName: energizer.middle_name,
    lastName: energizer.last_name,
    wikiPage: energizer.wiki_page,
    bornState: energizer.born_state,
    bornTown: energizer.born_town,
    homeState: energizer.home_state,
    homeTown: energizer.home_town,
    currentTown: energizer.current_town,
    currentState: energizer.current_state,
    earlyLife: energizer.early_life,
    bio: energizer.bio,
    playsWith: energizer.plays_with,
    agencyRep: energizer.rep_1,
    ethnicity: energizer.ethnicity,
    gender: energizer.gender,
    occupation: energizer.occupation,
    education: energizer.education,
    birthday: energizer.birthday,
    solicitor: energizer.solicitor,
    notes: energizer.notes,
    homeZipcode: energizer.home_zipcode,
    highSchool: energizer.high_school,
    imdbLink: energizer.imdb_link,
    social1: energizer.social_1,
    social2: energizer.social_2,
    social3: energizer.social_3,
    stat1: energizer.stat_1, 
    stat2: energizer.stat_2,
    createdAt: energizer.created_at     
  }

}
//all energizers by created date
router.get('/', async (req, res) => {
  try {
   const energizers = await Energizer.all(false);
   res.status(200).json({
      data: energizers.map(energizer => mapEnz(energizer))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Unable to find energizers',
      error: err.message,
    });
  }
});


router.get('/alpha', async (req, res) => {
  try {
   const energizers = await Energizer.all(true);
   res.status(200).json({
      data: energizers.map(energizer => mapEnz(energizer))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Unable to find energizers',
      error: err.message,
    });
  }
});



// delete energizer
router.post('/delete', async (req, res) => {
  const {id: energizerId, lastName} = req.body;
  try {
    await Energizer.query().delete().where('id', energizerId);

  } catch (err) {
    console.log('error on delete......');
    console.log(err);
    res.status(422).json({ message: 'Unable to delete Energizer' });
  }
  res.status(200).json({ message: 'deleted energizer '+lastName });

});

router.post('/uploadlist', async (req, res) => {
  const {
    enzlist
  } = req.body;

  console.log(`/Controllers/energizers/UPLOAD-LIST  - ${JSON.stringify(req.body, null, 4)}`);

  enzlist.forEach(async (enz) => {
        try {
            await Energizer.create(enz);
        } catch (err) {
            console.log('error uploading list........');
            console.log(err);
            res.status(422).json({ message: 'Unable to make list Energizer' });
        }

  })

  res.status(200).json({ message: 'new enz LIST added ok' });

});




// create energizer
router.post('/create', async (req, res) => {
  const {
    newEnz
  } = req.body;

  console.log(`/Controllers/energizers/CREATE-BODY  - ${JSON.stringify(req.body, null, 4)}`);


  try {

    await Energizer.create(newEnz);
  } catch (err) {
    console.log('error on create........');
    console.log(err);
    res.status(422).json({ message: 'Unable to make Energizer' });
  }
  res.status(200).json({ 
    message: 'new energizer ok'
   });
});


// update energizer
router.post('/update', async (req, res) => {
  const {updatedEnz} = req.body;
  console.log(`/Controllers/energizers/UPDATE RAW enz  - ${JSON.stringify(updatedEnz, null, 4)}`);
  try {
    const energizer = mapEnz(await Energizer.update(updatedEnz));
    console.log(`/Controllers/energizers/UPDATE post transform  - ${JSON.stringify(energizer, null, 4)}`);
    res.status(200).json(energizer);
  } catch (err) {
    console.log('error on update........');
    console.log(err);
    res.status(422).json({ message: 'Unable to update Energizer' });
  }

});

//fill in last name from first
router.get('/lastname', async (req, res) => {
  let noLast = []
  try {
    const energizers = await Energizer.all(true);

    for (const enz of energizers) {
          if ( !enz.last_name || enz.last_name == " ") {           
            enz.last_name = enz.first_name
            enz.first_name = null
            let updateResult = await Energizer.updateDirect(enz)
            console.log("updateResult",updateResult)
            noLast.push([updateResult.first_name, updateResult.last_name])
          } 

    } 
    await res.status(200).json({
        data: noLast
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Unable to fix lastnames',
      error: err.message,
    });
  }
});




//return current env
router.get('/env', async (req, res) => {
  try {
   res.status(200).json({
        version: process.env.NODE_ENV
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Unable to get env',
      error: err.message,
    });
  }
});




module.exports = router;
