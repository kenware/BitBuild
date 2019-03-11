
import MyWallet from 'blockchain.info/MyWallet';
import { User } from '../models';

export default class WalletMiddlewaere {
  // eslint-disable-next-line consistent-return
  async walletInit(req, res, next) {
    const apiCode = process.env.APICODE;
    const options = { apiCode, apiHost: process.env.APIHOST };

    const user = await User.findByPk(req.decoded.id);
    if (!user) { return res.status(400).json({ errors: { message: 'User not found' } }); }
    const wallet = new MyWallet(user.guid, process.env.BLOCKCHAIN_PASSWORD, options);

    req.user = user;
    req.wallet = wallet;
    next();
  }
}
