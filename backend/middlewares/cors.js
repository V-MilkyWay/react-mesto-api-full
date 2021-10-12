function cors(req, res, next) {
  const allowedOrigin = [
    'https://your.mesto.nomoredomains.club',
    'http://your.mesto.nomoredomains.club',
    'http://localhost:3001',
    'https://localhost:3001',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://62.84.114.117',
    'https://62.84.114.117',
  ];
  const allowedMethods = 'GET,PUT,HEAD,PATCH,DELETE,POST';
  const allowedHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;

  if (allowedOrigin.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', allowedHeaders);
    res.end();
  }

  next();
}

module.exports = {
  cors,
};
