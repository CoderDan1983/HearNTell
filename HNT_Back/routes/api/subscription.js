const express = require('express');
const router = express.Router();
const subscriptionController = require('../../controllers/subscriptionController.js');
const subscriberController = require('../../controllers/subscriberController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

// router.get('/listener_subscriptions/:listener_id', subscriptionController.getListenerSubscriptions);
router.route('/listener/:sub_id')
  .get(verifyRoles(ROLES_LIST.Member), subscriberController.getListenerSubscription);
// router.get('/listener/:sub_id', subscriptionController.getListenerSubscription);
//* SUBSCRIPTION Routes /api/subscription

//     Get list of subscriptions for user          GET /api/subscription/account/{account_id}
router.route('/account')
  .get(verifyRoles(ROLES_LIST.Member), subscriptionController.index);

router.route('/subscribers') //* gets the subscribers for a particular creator :)  //* using this one
  .get(verifyRoles(ROLES_LIST.Member), subscriptionController.subscribers);

//     Create subscription                         POST /api/subscription            
router.route('/') //* using this one
  .post(verifyRoles(ROLES_LIST.Member), subscriptionController.create);

//     Update subscription                         POST /api/subscription/{subscription_id}
router.route('/:subscription_id')
  .post(verifyRoles(ROLES_LIST.Member), subscriptionController.update);

//     Delete subscription                         DELETE /api/subscription/{subscription_id}
router.route('/:subscription_id') //* using this one
  .delete(verifyRoles(ROLES_LIST.Member), subscriptionController.remove);

//     Create subscription request                 POST /api/subscription/request
// router.route('/request') 
//   .post(verifyRoles(ROLES_LIST.Member), subscriptionController.createRequest);

//     Approve subscription request                POST /api/subscription/request/{subscription_request_id}/approve
router.route('/request/:subscription_request_id/approve') //* using this one
  .post(verifyRoles(ROLES_LIST.Member), subscriptionController.approve_request);

//     Delete subscription request                 DELETE /api/subscription/request/{subscription_request_id}
router.route('/request/:subscription_request_id')
  .delete(verifyRoles(ROLES_LIST.Member), subscriptionController.remove_request);

module.exports = router;