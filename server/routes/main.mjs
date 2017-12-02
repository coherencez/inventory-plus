import router from './router';
import { dataDelay, handleError } from '../../utils';

router.get('/', async (req, res) => {
  try {
    const data = await dataDelay(500, { message: `Welcome!` });
    res.send(data);
  } catch (e) {
    handleError(res)(e);
  }
});

export default router;
