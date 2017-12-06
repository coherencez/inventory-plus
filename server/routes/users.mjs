import router from './router';
import { createUser, login, getUsers } from '../db/users';

router.get('/users', getUsers);
router.post('/users/new', createUser);
router.post('/users/login', login);

export default router;
