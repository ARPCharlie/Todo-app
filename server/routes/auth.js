
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is the auth route');
});

router.post('/register', (req, res) => {
    // get form data using remix
    
});

module.exports = router;
