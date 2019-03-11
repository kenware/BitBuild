
import express from 'express';

import Auth from '../middleware/auth';
import WalletMiddleware from '../middleware/wallet';
import WalletController from '../controllers/wallet';

const router = express.Router();

router.get(
  '/wallet/balance',
  new Auth().verifyToken,
  new WalletMiddleware().walletInit,
  new WalletController().getBalance,
);
router.get(
  '/wallet/accounts',
  new Auth().verifyToken,
  new WalletMiddleware().walletInit,
  new WalletController().getAccounts,
);
router.post(
  '/wallet/accounts',
  new Auth().verifyToken,
  new WalletMiddleware().walletInit,
  new WalletController().creatAccount,
);
router.delete(
  '/wallet/accounts/:index',
  new Auth().verifyToken,
  new WalletMiddleware().walletInit,
  new WalletController().deleteAccount,
);
router.post(
  '/wallet/send',
  new Auth().verifyToken,
  new WalletMiddleware().walletInit,
  new WalletController().sendBitcoin,
);
export default router;
