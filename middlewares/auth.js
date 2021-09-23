import jsonwebtoken from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
function auth(req, res, next) {
  const { jwt } = req.cookies;
  if (!jwt) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, 'some-secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
}

export default auth;
