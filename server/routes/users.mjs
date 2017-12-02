import router from './router.mjs';
import { createUser, getUser, getUsers } from '../db/users.mjs';

router.get('/users', getUsers);
router.post('/users/new', createUser);
router.post('/users/login', getUser);

export default router;
