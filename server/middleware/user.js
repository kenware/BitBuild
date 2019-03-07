import Validator from 'validatorjs';
import { User } from '../models';

export default class userMiddleware {
  // eslint-disable-next-line consistent-return
  validateUser(req, res, next) {
    const { name, email, password } = req.body;
    const data = {
      name, email, password,
    };
    const rule = {
      email: 'required|email',
      name: 'required',
      password: ['required', 'min:10', 'regex:/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/'],
    };
    const errorMessage = {
      regex: {
        string: 'password must contain only letters and numbers',
      },
    };
    const validator = new Validator(data, rule, errorMessage);
    if (validator.fails()) {
      return res.status(400).json(validator.errors);
    }
    next();
  }

  // eslint-disable-next-line consistent-return
  async exist(req, res, next) {
    const { email } = req.body;
    let isAdmin = false;

    const user = await User.findOne({ where: { email } });
    const count = await User.count();
    if (count < 1) {
      isAdmin = true;
    }
    req.isAdmin = isAdmin;
    if (user) { return res.status(422).json({ errors: { message: 'Email already exist' } }); }
    next();
  }
}
