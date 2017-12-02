const r = require('rethinkdb');
const { handleError } = require('../../utils');

module.exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await r
      .table('users')
      .insert({ name, email, password })
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
