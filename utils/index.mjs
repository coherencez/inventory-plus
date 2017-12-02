export const handleError = res => error =>
  res.status(500).send({ error: error.message });

export const dataDelay = (ms, data = null) =>
  new Promise((res, rej) => setTimeout(res(data), ms));
