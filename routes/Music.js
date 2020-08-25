const app = require('express')()
const router = require('express').Router()
const qs = require('qs');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { CLIENT_ID, CLIENT_SECRET, KEY, REDIRECT_URI, TOKEN_SECRET } = require('../exports/index');
const jwt = require('jsonwebtoken')


router.get("/getMusic/:song", async (req, res) => {
  const songKey = req.params.song
  const access_token = req.cookies['access_token'];
  const ACCESS_TOKEN = jwt.verify(access_token, TOKEN_SECRET);

  axios.get(`https://api.spotify.com/v1/search?q=${songKey}&type=track&limit=10`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + ACCESS_TOKEN.access_token
    }
  }).then(({ data }) => {
    res.status(200).send(data.tracks.items)
  }).catch(error => {
    console.log(error)
  })
})

router.get("/getTopTracks", (req, res) => {

  const access_token = req.cookies['access_token'];
  const ACCESS_TOKEN = jwt.verify(access_token, TOKEN_SECRET);
  axios.get(`https://api.spotify.com/v1/browse/new-releases`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + ACCESS_TOKEN.access_token
    }
  }).then(({ data }) => {

    res.status(200).send(data.albums.items)
  }).catch(error => {
    console.log(error)
  })
})

// router.get("/play/:id", (req, res) => {
//   const id = req.params.id
//   const access_token = req.cookies['access_token'];
//   const ACCESS_TOKEN = jwt.verify(access_token, TOKEN_SECRET);

//   axios.get(`https://api.spotify.com/v1/tracks/${id}?market=US`, {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Bearer ' + ACCESS_TOKEN.access_token
//     }
//   }).then(({ data }) => {
//     console.log(data)
//     // res.status(200).send(data.albums.items)
//   }).catch(error => {
//     console.log(error)
//   })
// })

module.exports = router;