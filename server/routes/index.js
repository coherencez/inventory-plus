const main = require('./main');

module.exports.mountRoutes = app => {
  // add new use statement for each route
  app.use('/', main);
  console.log(`routes mounted`);
};
