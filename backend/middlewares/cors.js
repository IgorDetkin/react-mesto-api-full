const allowedCors = [
  'https://mesto.learnproject.nomoredomains.icu',
  'http://mesto.learnproject.nomoredomains.icu',
  'localhost:3000',
];

const cors = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  // if (method === 'OPTIONS') {
  //   res.header('Access-Control-Allow-Headers', requestHeaders);
  //   return res.end();
  // }

  next();
});

module.exports = { cors };
