
import EagerLoad from '../helpers/eagerLoad';

import { User } from '../models';

export default class includeMiddleware {
  // eslint-disable-next-line consistent-return
  include(req, res, next) {
    const { query } = req;
    const models = [{ model: User, as: 'users', attributes: ['id', 'email', 'wallet'] }];
    const include = new EagerLoad().include(models, query);
    req.include = include;
    next();
  }
}
