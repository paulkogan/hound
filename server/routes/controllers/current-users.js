const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const { currentUser } = req;
  if (currentUser) {
    res.json({
      data: {
        id: currentUser.id,
        name: currentUser.name,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      },
    });
  } else {
    res.status(422).json({ message: 'Current user not found' });
  }
});

module.exports = router;
