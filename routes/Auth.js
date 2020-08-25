const app = require('express')()
const router = require('express').Router()
const qs = require('qs');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { CLIENT_ID, CLIENT_SECRET, KEY, REDIRECT_URI, TOKEN_SECRET, BASE_URI } = require('../exports/index');

const jwt = require('jsonwebtoken')
const { sendDataBodyListener } = require('../socket');



router.get('/login', (req, res) => {

  const id = uuidv4();
  res.cookie('spotify_auth_state', id)

  const scopes = 'streaming user-read-private user-read-email user-read-currently-playing user-library-read';
  return res.redirect(
    'https://accounts.spotify.com/authorize?' +
    qs.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scopes,
      redirect_uri: REDIRECT_URI,
      state: id,
      show_dialog: true
    }));
})



router.get('/redirect', async (req, res) => {

  try {
    const code = await req.query.code || null;
    const state = await req.query.state || null;
    const cookieKey = await req.cookies ? req.cookies['spotify_auth_state'] : null;

    if (state === null || state !== cookieKey) {
      res.redirect('/#' +
        qs.stringify({
          error: 'state_mismatch'
        }));
      return;
    }
    res.clearCookie('spotify_auth_state');

    await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET
      }
    }).then(async response => {
      const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      const token_access_token = jwt.sign({ access_token }, TOKEN_SECRET);
      const token_refresh_token = jwt.sign({ refresh_token }, TOKEN_SECRET);
      axios({
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          access_token,
          refresh_token
        }
      }).then(response => {
        res.cookie("access_token", token_access_token, { maxAge: expiryDate, httpOnly: true })
        res.cookie("refresh_token", token_refresh_token, { maxAge: expiryDate, httpOnly: true })
        res.cookie("logged_in", true, { maxAge: expiryDate, httpOnly: true })
        sendDataBodyListener(response.data)

        res.redirect(`${BASE_URL}/#` + qs.stringify({
          authenticated: true,
        }))
      }).catch(err => {
        res.redirect('/#' + qs.stringify({
          error: 'invalid token'
        }))
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    });
  } catch (err) {
    res.send(500).json({ error: err })
  }
});

router.get('/loggedIn', (req, res) => {
  const bool = req.cookies["logged_in"]
  res.status(200).send(bool)
})

router.get('/logout', (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.clearCookie("io");
  res.clearCookie('logged_in')
  res.send('cookie deleted')
})


router.get('/update_token', async (req, res) => {
  try {
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000)
    const refresh_token = req.cookies['refresh_token'];
    const REFRESH_TOKEN = jwt.verify(refresh_token, TOKEN_SECRET);

    if (!REFRESH_TOKEN.refresh_token) {
      console.log("error")
    }
    await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      params: {
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN.refresh_token
      },
    })
      .then(response => {
        const access_token = response.data.access_token
        const token_access_token = jwt.sign({ access_token }, TOKEN_SECRET);

        if (!access_token) {
          return res.status(401).json({ error: "Invalid Creditials" })
        }
        res.cookie("access_token", token_access_token, { maxAge: expiryDate, httpOnly: true })
        res.redirect('http://localhost:3000/#' + qs.stringify({
          authenticated: true
        }))
      }).catch(err => {
        res.redirect('/#' + qs.stringify({
          error: 'invalid token'
        }))
      })
  } catch (err) {
    res.send(500).json({ error: err })
  }
})



module.exports = router;