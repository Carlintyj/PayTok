const express = require('express');
const router = express.Router();

const CLIENT_KEY = 'sbawkxnfxn8y44qrde'
const SERVER_ENDPOINT_REDIRECT = 'http://localhost:3000/'

router.get('/auths', async (req, res) => {
    const csrfState = Math.random().toString(36).substring(2);
    res.cookie('csrfState', csrfState, { maxAge: 60000 });

    let url = 'https://www.tiktok.com/v2/auth/authorize/';

    // the following params need to be in `application/x-www-form-urlencoded` format.
    url += '?client_key={CLIENT_KEY}';
    url += '&scope=user.info.basic';
    url += '&response_type=code';
    url += '&redirect_uri={SERVER_ENDPOINT_REDIRECT}';
    url += '&state=' + csrfState;

    res.redirect(url);
})

module.exports = router;