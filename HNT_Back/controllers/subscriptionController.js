const Subscription = require('../model/Subscription');
const SubscriptionRequest = require('../model/SubscriptionRequest');


//* Get list of subscriptions for user account
const index = async (req, res) => {
  const account_id = req.params.account_id;
  let subscriptions = await Subscription.find({listener_id: account_id});
  res.json(subscriptions);
};

//* Create subscription
const create = async (req, res) => {
  const subscription_data = {
    listener_id: req.body.listener_id,
    creator_id: req.body.creator_id
  };
  let subscription = await Subscription.create(subscription_data);
  res.json(subscription);
};

//* Update subscription
const update = async (req, res) => {
  const subscription_id = req.params.subscription_id;
  const subscription_data = {
    listener_id: req.body.listener_id,
    creator_id: req.body.creator_id
  };
  let subscription = await Subscription.findOneAndUpdate({_id: subscription_id}, subscription_data, {upsert: true});
  res.json(subscription);
};

//* Delete subscription
const remove = async (req, res) => {
  const subscription_id = req.params.subscription_id;
  let subscription = await Subscription.findOneAndDelete({_id: subscription_id});
  res.json(subscription);
};

//* Create subscription request
const createRequest = async (req, res) => {
  const subscription_request_data = {
    listener_id: req.body.listener_id,
    creator_id: req.body.creator_id,
  };
  let request = await SubscriptionRequest.create(subscription_request_data);
  res.json(request);
};

//* Approve subscription request
const approveRequest = async (req, res) => {
  const subscription_request_id = req.params.subscription_request_id;
  let request = await SubscriptionRequest.findOneAndUpdate({_id: subscription_request_data}, {approved: true})
  res.json(request);
};

//* Delete subscription request
const removeRequest = async (req, res) => {
  const subscription_request_id = req.params.subscription_request_id;
  let request = await SubscriptionRequest.findOneAndDelete({_id: subscription_request_id});
  res.json(request);
};

module.exports = {
  index,
  create,
  update,
  remove,
  createRequest,
  approveRequest,
  removeRequest
}
