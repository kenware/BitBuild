import jwt from 'jsonwebtoken';

export default class auth {
  // eslint-disable-next-line consistent-return
  verifyToken(req, res, next) {
    let token = req.headers.authorization || ' ';
    token = token.replace('Bearer ', '');
    try {
      const verify = jwt.verify(token, process.env.SECRETE);
      const {
        id, email, isAdmin, guid,
      } = verify;

      req.decoded = {
        id, email, isAdmin, guid,
      };
      next();
    } catch (err) {
      return res.status(401).json({ errors: { message: 'Unathorized access' } });
    }
  }
}
