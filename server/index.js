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
// app.use(db.connect);

// mount async routes into main express app
mountRoutes(app);

const startServer = (async () => {
  try {
    const dbSetup = await db.initializeRDB();
    if (dbSetup) {
      app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
    }
  } catch (e) {
    console.log(
      `Error connecting to database or initializing server. Refer to logs for more information`
    );
    console.log(e.message);
    process.exit(1);
  }
})();
