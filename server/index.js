require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 8000;
const mountRoutes = require('./routes');

const app = express();
mountRoutes(app);

app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
