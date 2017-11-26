const r = require('rethinkdb');
const { handleError } = require('../../utils');

module.exports.connect = async (req, res, next) => {
  try {
    const connection = await r.connect({
      db: 'test',
      host: 'localhost',
      port: process.env.DB_PORT
    });
    // add the db connection to the request object for easy access
    req._rdb = connection;
    next();
  } catch (e) {
    handleError(res)(e);
  }
};
