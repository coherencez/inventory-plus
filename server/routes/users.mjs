import router from './router';
import { createUser, getUser, getUsers } from '../db/users';

router.get('/users', getUsers);
router.post('/users/new', createUser);
router.post('/users/login', getUser);

export default router;
