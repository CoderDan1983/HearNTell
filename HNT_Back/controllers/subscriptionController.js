const Subscription = require('../model/Subscription');
const User = require('../model/User');
// const SubscriptionRequest = require('../model/SubscriptionRequest');


//* Get list of subscriptions for user account
const index = async (req, res) => {
  const { _id: listener_id } = await User.findOne({ username: req.user });
  console.log('subscriptionController, index.  user_id is: ', listener_id);

  let subscriptions = listener_id && await Subscription.find({ listener_id }).populate("creator", "name").populate("listener", "name");
  console.log('line 12.  subscriptions is: ', subscriptions);
  // subscriptions && subscriptions.length && subscriptions;

  console.log('returning the following subscriptions: ', subscriptions);
  res.json(subscriptions);
};

//* gets the creator's list of subscribers.
const subscribers = async (req, res) => {
  const { _id: creator_id } = await User.findOne({ username: req.user });
  // const { creator_id } = req.params; //$ currently creator_id is undefined :)
  console.log('subscriptionController, subscribers.  creator_id is: ', creator_id);

  let subscriptions = creator_id && await Subscription.find({ creator_id })
    .populate("creator", "name").populate("listener", "name");
  console.log('line 25.  subscriptions are: ', subscriptions);
  // subscriptions && subscriptions.length && subscriptions;
  console.log('returning the following subscriptions: ', subscriptions);
  res.json(subscriptions);
};

// //* Create subscription
// const create = async (req, res) => {
//   const { _id: user_id } = await User.findOne({ username: req.user });
//   const subscription_data = {
//     listener_id: req.body.listener_id,
//     creator_id: req.body.creator_id
//   };
//   console.log('subscriptionController, create.  body is: ', req.body);

//   let subscription = await Subscription.create(subscription_data);
//   console.log('returning: ', subscription)

//   res.json(subscription);
// };

//* Update subscription
const update = async (req, res) => {
  // const { _id: user_id } = await User.findOne({ username: req.user });
  const subscription_id = req.params.subscription_id;
  const subscription_data = {
    listener_id: req.body.listener_id,
    creator_id: req.body.creator_id,
    status: req.body.status,
  };
  console.log('subscriptionController, update.  params is: ', req.params);

  let subscription = await Subscription.findOneAndUpdate({_id: subscription_id }, subscription_data, { upsert: true, new: true });
  console.log('returning: ', subscription)

  res.json(subscription);
};

//* Delete subscription
const remove = async (req, res) => {
  // const { _id: user_id } = await User.findOne({ username: req.user });
  const subscription_id = req.params.subscription_id;
  console.log('subscriptionController, remove.  subscription_id is: ', subscription_id);

  let subscription = await Subscription.findOneAndDelete({_id: subscription_id });
  console.log('returning: ', subscription)

  res.json(subscription);
};

//* Create subscription ("request".  status starts out as pending, after all)
const create = async (req, res) => { //createRequest //* only listeners can create subscription requests :)
  const { _id: listener_id } = await User.findOne({ username: req.user });
  
  const subscription_request_data = {
    listener_id,
    listener: listener_id,
    creator_id: req.body.creator_id,
    creator: req.body.creator_id,
    playlist_id: req.body.playlist_id,
  };
  console.log('subscriptionController, createRequest.  body is: ', req.body, ', listener_id is: ', listener_id);
  // let request = await SubscriptionRequest.create(subscription_request_data);
  let request = await Subscription.create(subscription_request_data);
  console.log('returning: ', request)

  res.json(request);
};

//* Approve subscription ("request")
const approve_request = async (req, res) => {
  // const { _id: user_id } = await User.findOne({ username: req.user });
  const subscription_id = req.params.subscription_id; //$ correct subscription_id passed here from creatorAccessRequests!
  console.log('subscriptionController, approveRequest.  subscription_id is: ', subscription_id);

  // let request = await SubscriptionRequest.findOneAndUpdate({_id: subscription_request_data}, {approved: true});
  let request = await Subscription.findOneAndUpdate({_id: subscription_id}, { status: "approved" });
  console.log('returning: ', request)

  res.json(request); //returns non-updated version :)
};

//* Delete subscription request
const remove_request = async (req, res) => {
  // const { _id: user_id } = await User.findOne({ username: req.user });
  const subscription_id = req.params.subscription_id;
  console.log('subscriptionController, removeRequest.  subscription_id is: ', subscription_id);

  let request = await Subscription.findOneAndDelete({ _id: subscription_id });
  console.log('returning: ', request)
  res.json(request);
};

module.exports = {
  index,
  subscribers,
  create,
  update,
  remove,
  // createRequest,
  approve_request,
  remove_request,
}
