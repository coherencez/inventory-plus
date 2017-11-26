const Router = require('express-promise-router')
const dataDelay = (ms, data = null) =>
  new Promise(res => setTimeout(res(data), ms));

export const mountRoutes = app => {
  console.log(`routes mounted`)
  app.use('/', (req, res) => {
    const data = await dataDelay(300, {a: 'hello', b: 2})
    res.send(data)
  });
};
