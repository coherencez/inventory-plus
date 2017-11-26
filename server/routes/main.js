const router = require('./router');

const dataDelay = (ms, data = null) =>
  new Promise((res, rej) => setTimeout(res(data), ms));

router.get('/', async (req, res) => {
  const data = await dataDelay(300, { message: `Welcome!` });
  res.send(data);
});

module.exports = router;
