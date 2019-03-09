import jwt from 'jsonwebtoken';

export default class userHelper {
  generateToken(data) {
    return jwt.sign(data, process.env.SECRETE, { expiresIn: '1h' });
  }

  userWithToken(user) {
    const tokenData = {
      id: user.id, emai: user.email, isAdmin: user.isAdmin, guid: user.guid,
    };
    const token = this.generateToken(tokenData);
    // eslint-disable-next-line no-param-reassign
    user.dataValues.token = token;
    return user;
  }
}
