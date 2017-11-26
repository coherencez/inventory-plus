const router = require('./router');
const { dataDelay, handleError } = require('../../utils');

router.get('/', async (req, res) => {
  try {
    const data = await dataDelay(300, { message: `Welcome!` });
    res.send(data);
  } catch (e) {
    handleError(res)(e);
  }
});

module.exports = router;
