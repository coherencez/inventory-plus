const main = require('./main');
const users = require('./users');

module.exports.mountRoutes = app => {
  // add new use statement for each route
  app.use('/', main);
  app.use('/users', users);
  console.log(`routes mounted`);
};
