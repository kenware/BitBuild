
import { Plan } from '../models';

export default class PlanController {
  async post(req, res) {
    try {
      const { id } = req.decoded;
      const { name, principal } = req.body;
      const plan = await Plan.create({
        name, principal, amount: principal, userId: id,
      });
      return res.status(201).json(plan);
    } catch (err) {
      return res.status(500).json({ errors: { message: 'Error occured while creating a plan' } });
    }
  }

  async get(req, res) {
    try {
      const { where, include } = req;
      const plans = await Plan.findAll({ where, include });
      return res.status(200).json(plans);
    } catch (err) {
      return res.status(500).json({ errors: { message: 'Error occured while fetching plan' } });
    }
  }
}
