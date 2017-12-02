const r = require('rethinkdb');
const bcrypt = require('bcrypt');
const { handleError } = require('../../utils');
const SALT_ROUNDS = 12;

module.exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await r
      .table('users')
      .insert({ name, email, password: hashedPassword })
      .run(req._rdb);

    res.status(200).send({ message: 'Successfully created new user!' });
  } catch (e) {
    handleError(res)(e);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const data = await r.table('users').run(req._rdb);
    const users = await data.toArray();
    res.status(200).send(users);
  } catch (e) {
    handleError(res)(e);
  }
};
