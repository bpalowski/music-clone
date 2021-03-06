const express = require('express')
const app = require('express')()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require("cors");
const port = process.env.PORT || 5000;

const { setServerIO } = require('./socket');
const { ignoreFavicon } = require('./config/utils')

require('dotenv').config()

const cookieParser = require('cookie-parser');
const auth = require('./routes/Auth')
const music = require('./routes/Music')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser());
app.use(ignoreFavicon);
// Routes
app.use('/api', auth);
app.use('/musicSearch', music);

// serve static if production
if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

//Sockit
setServerIO(app.listen(port, () => console.log("port: ", port)))

