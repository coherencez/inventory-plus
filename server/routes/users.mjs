import router from './router';
import { createUser, login, logins } from '../db/users';

router.get('/users', logins);
router.post('/users/new', createUser);
router.post('/users/login', login);

export default router;
