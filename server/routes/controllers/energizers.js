const express = require('express');
const Energizer = require('../../models/energizer');
//const User = require('../../models/user');

const router = express.Router();


router.get('/', async (req, res) => {

    res.send("Hello from Hound")


});



router.get('/list', async (req, res) => {
  try {
    const energizers = await Energizer.all();
     console.log("Controllers/Energizers/list -> EXAMPLE", JSON.stringify(energizers[0],null,4))

  res.json({
      data: energizers.map(energizer => ({
        id: energizer.id,
        firstName: energizer.first_name,
        lastName: energizer.last_name,
        occupation: energizer.occupation,
        wikiPage: energizer.wiki_page,
        homeState: energizer.home_state,
        homeTown: energizer.home_town
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


module.exports = router;
