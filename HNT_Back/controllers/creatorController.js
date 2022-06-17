const Profile = require('../model/Profile');
const SubscriptionRequest = require('../model/SubscriptionRequest');


//* Create creator profile
const create = async (req, res) => {
  let request_data = req.body;
  let profile_data = {
    name: request_data.name,
    account_id: request_data.account_id,
    image_url: request_data.image_url,
    about_me: request_data.about_me,
  }
  let profile = await Profile.create(profile_data);
    res.json(profile);
};

//* Update creator profile
const updateCreatorProfile = async (req, res) => {
  let request_data = req.body;
  let profile_data = {
    name: request_data.name,
    account_id: request_data.account_id,
    image_url: request_data.image_url,
    about_me: request_data.about_me,
  }
  let profile = await Profile.findOneAndUpdate({_id: req.body.id},profile_data);
    res.json(profile);
};

//* Get creator profile
const creatorProfile = async (req, res) => {
  const account_id = req.params.account_id;
  let profile = await Profile.findOne({account_id: account_id});
  res.json(profile);
};

//* Get Subscription requests for this creator
const subscriptionRequests = async (req, res) => {
  const account_id = req.params.account_id;
  let subscription_requests = await SubscriptionRequest.find({creator_account_id: account_id});
  res.json(subscription_requests);
};

//* Get subscription requests that have been approved for this creator
const subscriptionsApproved = async (req, res) => {
  const account_id = req.params.account_id;
  let approved_subscription_requests = await SubscriptionRequest.find({creator_account_id: account_id, approved: true});
  res.json(approved_subscription_requests);
};

//* Get subscription requests that are pending for this creator
const subscriptionsPending = async (req, res) => {
  const account_id = req.params.account_id;
  let pending_subscription_requests = await SubscriptionRequest.find({creator_account_id: account_id, aproved: false});
  res.json(pending_subscription_requests);
};



module.exports = {
  create,
  creatorProfile,
  subscriptionRequests,
  subscriptionsApproved,
  subscriptionsPending,
  updateCreatorProfile,
}
