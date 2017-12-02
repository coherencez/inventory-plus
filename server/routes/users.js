const router = require('./router');
const { createUser, getUsers } = require('../db/users');

router.post('/users/new', createUser);
router.get('/users', getUsers);

module.exports = router;
