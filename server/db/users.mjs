import r from 'rethinkdb';
import bcrypt from 'bcrypt';
import { handleError } from '../../utils';

export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const newUser = await r
      .table('users')
      .insert({ name, email, password: hashedPassword })
      .run(req._rdb);

    res.status(200).send({ message: 'Successfully created new user!' });
  } catch (e) {
    handleError(res)(e);
  }
};

export const getUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const data = await r
      .table('users')
      .filter({ email })
      .run(req._rdb);
    const [dbUser] = await data.toArray();
    (await bcrypt.compare(password, dbUser.password))
      ? res.status(200).send({ message: 'Successfully logged in!' })
      : res.status(200).send({
        message:
            'Sorry, either your email or your password was incorrect. Please try again!'
      });
  } catch (e) {
    // custom error message to prevent leaking which identifier is wrong
    const errorObj = Object.assign({}, e, {
      message:
        'Sorry, either your email or your password was incorrect. Please try again!'
    });
    handleError(res)(errorObj);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const data = await r.table('users').run(req._rdb);
    const users = await data.toArray();
    res.status(200).send(users);
  } catch (e) {
    handleError(res)(e);
  }
};
