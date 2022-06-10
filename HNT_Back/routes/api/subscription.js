const express = require('express');
const router = express.Router();
const subscriptionController = require('../../controllers/subscriptionController.js');

// router.get('/listener_subscriptions/:listener_id', subscriptionController.getListenerSubscriptions);
router.get('/listener/:sub_id', subscriptionController.getListenerSubscription);

module.exports = router;





//todo SUBSCRIPTION Routes /api/subscription

//     Get list of subscriptions for user          GET /api/subscription/user/{user_id}

//     Create subscription                         POST /api/subscription            

//     Update subscription                         POST /api/subscription/{subscription_id}

//     Delete subscription                         DELETE /api/subscription/{subscription_id}

//     Create subscription request                 POST /api/subscription/request

//     Approve subscription request                POST /api/subscription/request/{subscription_request_id}/approve

//     Reject subscription request                 POST /api/subscription/request/{subscription_request_id}/reject

//     Delete subscription request                 DELETE /api/subscription/request/{subscription_request_id}