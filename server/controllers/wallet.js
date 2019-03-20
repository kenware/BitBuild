

export default class WalletController {
  async getBalance(req, res) {
    try {
      const { wallet } = req;
      const balance = await wallet.getBalance();
      return res.status(200).json(balance);
    } catch (err) {
      return res.status(500).json({ errors: { message: 'Error occured while fetching balance' } });
    }
  }

  async getAccounts(req, res) {
    try {
      const { wallet } = req;
      const accounts = await wallet.listAccounts();
      return res.status(200).json(accounts);
    } catch (err) {
      return res.status(500).json({ errors: { message: 'Error occured while fetching accounts' } });
    }
  }

  async creatAccount(req, res) {
    try {
      const { wallet, body: { name } } = req;
      const label = name || 'New account';

      const account = await wallet.createAccount({ label });
      return res.status(200).json(account);
    } catch (err) {
      return res.status(500).json({ errors: { message: 'Error occured while creating accounts' } });
    }
  }

  async deleteAccount(req, res) {
    try {
      const { wallet, params: { index } } = req;
      if (!index) { return res.status(400).json({ errors: { message: 'Account index not specifified in the request param' } }); }

      const deleted = await wallet.archiveAccount(index);
      return res.status(200).json(deleted);
    } catch (err) {
      return res.status(500).json({ errors: { message: 'Error occured while deleting accounts' } });
    }
  }

  async sendBitcoin(req, res) {
    try {
      const { wallet, body: { amount } } = req;
      let { address } = req.boy;

      address = address || process.env.GLOBAL_ADDRESS;
      if (!address || !amount) { return res.status(400).json({ errors: { message: 'address or amount not specified' } }); }
      const transaction = await wallet.send(address, amount);
      return res.status(200).json(transaction);
    } catch (err) {
      return res.status(500).json({ errors: { message: 'Error sending bitcoin' } });
    }
  }
}
