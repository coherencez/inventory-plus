module.exports.handleError = res => error =>
  res.status(500).send({ error: error.message });

module.exports.dataDelay = (ms, data = null) =>
  new Promise((res, rej) => setTimeout(res(data), ms));
