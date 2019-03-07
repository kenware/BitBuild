
import { Plan } from '../models';

export default class PlanMiddlewaere {
  // eslint-disable-next-line consistent-return
  validatePlan(req, res, next) {
    if (!req.body.name) {
      return res.status(400).json({ errors: { message: 'Plan name is required' } });
    }
    if (!req.body.principal) {
      return res.status(400).json({ errors: { message: 'Plan principal is required' } });
    }
    next();
  }

  get(req, res, next) {
    req.model = Plan;
    next();
  }
}
