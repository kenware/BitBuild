
import express from 'express';
import UserMiddleware from '../middleware/user';
import UserController from '../controllers/user';
import Auth from '../middleware/auth';

const router = express.Router();

router.post(
  '/auth/signup',
  new UserMiddleware().validateUser,
  new UserMiddleware().exist,
  new UserController().signUp,
);
router.post(
  '/auth/login',
  new UserController().login,
);
router.get(
  '/wallet',
  new Auth().verifyToken,
  new UserController().getOne,
);
export default router;
