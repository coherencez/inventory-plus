import r from 'rethinkdb';
import { handleError } from '../../utils/index.mjs';

export const connect = async (req, res, next) => {
  // middleware that adds db connection to the request object for easy access
  // TODO: find better way to handle this
  try {
    const connection = await r.connect({
      db: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    });
    req._rdb = connection;
    next();
  } catch (e) {
    handleError(res)(e);
  }
};
