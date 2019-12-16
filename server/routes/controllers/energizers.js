const express = require('express');
const Energizer = require('../../models/energizer');
const router = express.Router();
require('dotenv').config();

//list all energizers
router.get('/', async (req, res) => {
  try {
   const energizers = await Energizer.all();
     //console.log("Controllers/Energizers/list -> EXAMPLE", JSON.stringify(energizers[0],null,4))
     //console.log("Controllers/Energizers/list -> length", energizers.length)
   res.status(200).json({
      data: energizers.map(energizer => ({
        id: energizer.id,
        firstName: energizer.first_name,
        lastName: energizer.last_name,
        wikiPage: energizer.wiki_page,
        bornState: energizer.born_state,
        bornTown: energizer.born_town,
        homeState: energizer.home_state,
        homeTown: energizer.home_town,
        currentTown: energizer.current_town,
        currentState: energizer.current_state,
        earlyLife: energizer.early_life,
        playsWith: energizer.plays_with,
        ethnicity: energizer.ethnicity,
        gender: energizer.gender,
        occupation: energizer.occupation,
        education: energizer.education,
        bio: energizer.bio
      })
    )
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Unable to find energizers',
      error: err.message,
    });
  }
});

//list all energizers
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

// delete energizer
router.post('/delete', async (req, res) => {
  const {id: energizerId, lastName} = req.body;
  try {
    await Energizer.query().delete().where('id', energizerId);

  } catch (err) {
    console.log('error........');
    console.log(err);
    res.status(422).json({ message: 'Unable to delete Energizer' });
  }
  res.status(200).json({ message: 'deleted energizer '+lastName });

});

// create energizer
router.post('/create', async (req, res) => {
  const {
    firstName, lastName, occupation, wikiPage
  } = req.body;

  console.log(`/Controllers/energizers/CREATE  - ${JSON.stringify(req.body, null, 4)}`);


  try {

    await Energizer.create({
        firstName,
        lastName,
        occupation,
        wikiPage,
    });
  } catch (err) {
    console.log('error........');
    console.log(err);
    res.status(422).json({ message: 'Unable to make Energizer' });
  }
  res.status(200).json({ message: 'new provider ok' });
});


// update energizer
router.post('/update', async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    wikiPage,
    homeState,
    homeTown,
    bornState,
    bornTown,
    currentTown,
    currentState,
    earlyLife,
    playsWith,
    ethnicity,
    gender,
    occupation,
    education,
    bio
  } = req.body;

console.log(`/Controllers/energizers/UPDATE  - ${JSON.stringify(req.body, null, 4)}`);

  try {
    const provider = await Energizer.update({
      id,
      firstName,
      lastName,
      wikiPage,
      homeState,
      homeTown,
      bornState,
      bornTown,
      currentTown,
      currentState,
      earlyLife,
      playsWith,
      ethnicity,
      gender,
      occupation,
      education,
      bio
    });

  } catch (err) {
    console.log('error........');
    console.log(err);
    res.status(422).json({ message: 'Unable to update Energizer' });
  }

  res.status(200).json({ message: 'updated energizer ok' });
});






module.exports = router;
