
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import MyWallet from 'blockchain.info/MyWallet';
import { User } from '../models';
import UserHelper from '../helpers/user';

export default class userController {
  async signUp(req, res) {
    try {
      const { email, name } = req.body;
      const apiCode = process.env.APICODE;
      const option = { apiHost: process.env.APIHOST, hd: true, label: name };
      const password = bcrypt.hashSync(req.body.password, 10);
      const blockchainPassword = process.env.BLOCKCHAIN_PASSWORD;

      const wallet = await MyWallet.create(blockchainPassword, apiCode, option);

      let user = await User.create({
        email, name, password, isAdmin: req.isAdmin, guid: wallet.guid,
      });
      user = new UserHelper().userWithToken(user);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async login(req, res) {
    try {
      const { password, email } = req.body;
      let passwordMatch;

      let user = await User.findOne({ where: { email } });
      if (user) {
        passwordMatch = bcrypt.compareSync(password, user.password);
      }

      if (!user || !passwordMatch) { return res.status(404).json({ errors: { message: 'Wrong email or password' } }); }

      user = new UserHelper().userWithToken(user);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.decoded;

      const user = await User.findByPk(id);
      if (!user) { return res.status(404).json({ errors: { message: 'User not found' } }); }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async refresh(req, res) {
    try {
      const token = jwt.sign(req.decoded, process.env.SECRETE, { expiresIn: '1h' });
      const user = req.decoded;
      user.token = token;
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}
