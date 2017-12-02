const router = require('./router');
const { createUser, getUser, getUsers } = require('../db/users');

router.get('/users', getUsers);
router.post('/users/new', createUser);
router.post('/users/login', getUser);

module.exports = router;
