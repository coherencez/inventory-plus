require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const db = require('./db');
const { mountRoutes } = require('./routes');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// create db connection and attach to req object
app.use(db.connect);

// mount async routes into main express app
mountRoutes(app);

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
