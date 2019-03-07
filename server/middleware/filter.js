
import GetAttributes from '../helpers/getAttributes';

export default class getMiddleware {
  // eslint-disable-next-line consistent-return
  filter(req, res, next) {
    const { query } = req;
    const where = new GetAttributes().get(req.model, query);
    if (where.error) {
      return res.status(200).json({ errors: { message: where.message } });
    }
    req.where = where;
    next();
  }
}
