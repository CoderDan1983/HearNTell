const Account = require('../model/Account');


//* Create an account
const create = async (req, res) => {
  const request_data = req.body;

  let account_data = {
    name: request_data.name,
    paid_subscription: request_data.paid_subscription,
    next_billing_date: request_data.next_billing_date,
    advertiser: request_data.advertiser
  }

  let account = await Account.create(account_data);
    res.json(account);
};

//* Get list of accounts
const index = async (req, res) => {
  let accounts = await Account.find({});
  res.json(accounts);
};

//* Get single account
const show = async (req, res) => {
  const user_id = req.params.user_id
  let account = await Account.findOne({_id: user_id})
  res.json(account);
};

//* Update an account
const update = async (req, res) => {
  const user_id = req.params.user_id;
  const request_data = req.body;

  let account_data = {
    name: request_data.name,
    paid_subscription: request_data.paid_subscription,
    next_billing_date: request_data.next_billing_date,
    advertiser: request_data.advertiser
  }

  let account = await Account.findOneAndUpdate({_id: user_id}, account_data);
  res.json(account);
};

//* Remove an account
const remove = async (req, res) => {
  const user_id = req.params.user_id;
  let account = await Account.findOneAndDelete({_id: user_id});
  res.json(account);
};



module.exports = {
  create,
  index,
  show,
  update,
  remove
}
