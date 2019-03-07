
import express from 'express';
import PlanMiddleware from '../middleware/plan';
import PlanController from '../controllers/plan';
import Auth from '../middleware/auth';
import FilterMiddleware from '../middleware/filter';
import IncludeMiddleware from '../middleware/include';

const router = express.Router();

router.post(
  '/plans',
  new Auth().verifyToken,
  new PlanMiddleware().validatePlan,
  new PlanController().post,
);
router.get(
  '/plans',
  //   new Auth().verifyToken,
  new PlanMiddleware().get,
  new IncludeMiddleware().include,
  new FilterMiddleware().filter,
  new PlanController().get,
);

export default router;
