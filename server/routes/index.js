const main = require('./main');

const mountRoutes = app => {
  // add new use statement for each route
  app.use('/', main);
  console.log(`routes mounted`);
};

module.exports = mountRoutes;
