module.exports.handleError = res => (status, error) =>
  res.status(status).send({ error: error.message });

module.exports.dataDelay = (ms, data = null) =>
  new Promise((res, rej) => setTimeout(res(data), ms));
