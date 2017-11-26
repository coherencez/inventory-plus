const r = require('rethinkdb');
const config = require('./config');
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

/*
 * Create tables/indexes then start express
 */
module.exports.initializeRDB = () =>
  r.connect(config.rethinkdb, (err, conn) => {
    if (err) {
      console.log('Could not open a connection to initialize the database');
      console.log(err.message);
      process.exit(1);
    }

    r
      .table('users')
      .indexWait('createdAt')
      .run(conn)
      .then(function (err, result) {
        console.log('Table and index are available, starting express...');
        return true;
      })
      .error(err => {
        // The database/table/index was not available, create them
        r
          .dbCreate(config.rethinkdb.db)
          .run(conn)
          .finally(() => r.tableCreate('users').run(conn))
          .finally(() =>
            r
              .table('users')
              .indexCreate('createdAt')
              .run(conn)
          )
          .finally(result =>
            r
              .table('users')
              .indexWait('createdAt')
              .run(conn)
          )
          .then(result => {
            console.log('Table and index are available, starting express...');
            return true;
            conn.close();
          })
          .error(err => {
            if (err) {
              console.log(
                'Could not wait for the completion of the index `users`'
              );
              console.log(err);
              process.exit(1);
            }
            console.log('Table and index are available, starting express...');
            return true;
            conn.close();
          });
      });
  });
