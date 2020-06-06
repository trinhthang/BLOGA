const express = require("express");

const bodyParser = require("body-parser");

const morgan = require("morgan");

const mongoose = require("mongoose");

const _CONST = require('./app/config/constant');

const DB_MONGO = require('./app/config/db.config');

const app = express();

//Sau này sẽ là RESTful API cross domain
var corsOptions = {
    origin: "http://localhost:6969"
}

app.use(morgan('combined')); //Theo dõi Log GET, POST ...

app.use(express.static('public', { 'extensions': ['jsx'] }));

app.set('view engine', 'ejs');

//parse request of content-type: application/json
app.use(bodyParser.json);

//parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

function connect() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', console.log('Connect to mongoDB is OK'));

    return mongoose.connect(DB_MONGO.url, { keepAlive: 1, useNewUrlParser: true })
}

require('./app/route/')(app);

const PORT = process.env.PORT || _CONST.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})