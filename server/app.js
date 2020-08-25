const app = require('express')()
const bodyParser = require('body-parser')
const cors = require("cors");
const port = process.env.PORT || 5000;

const { setServerIO } = require('./socket');

require('dotenv').config()

const cookieParser = require('cookie-parser');
const auth = require('./routes/Auth')
const music = require('./routes/Music')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser());

// Routes
app.use('/api', auth);
app.use('/musicSearch', music);

//Sockit
setServerIO(app.listen(port, () => console.log("port: ", port)))

