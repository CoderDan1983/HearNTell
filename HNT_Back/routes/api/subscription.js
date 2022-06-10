const express = require('express');
const router = express.Router();
const subscriptionController = require('../../controllers/subscriptionController.js');

// router.get('/listener_subscriptions/:listener_id', subscriptionController.getListenerSubscriptions);
router.get('/listener/:sub_id', subscriptionController.getListenerSubscription);



//* SUBSCRIPTION Routes /api/subscription

//     Get list of subscriptions for user          GET /api/subscription/user/{user_id}
router.get('/user/:user_id', subscriptionController.userIndex);

//     Create subscription                         POST /api/subscription            
router.post('/', subscriptionController.create);

//     Update subscription                         POST /api/subscription/{subscription_id}
router.get('/:subcription_id', subscriptionController.update);

//     Delete subscription                         DELETE /api/subscription/{subscription_id}
router.delete('/:subscription_id', subscriptionController.remove);

//     Create subscription request                 POST /api/subscription/request
router.post('/request', subscriptionController.createRequest);

//     Approve subscription request                POST /api/subscription/request/{subscription_request_id}/approve
router.post('/request/:subscription_request_id/approve', subscriptionController.getListenerSubscription);

//     Reject subscription request                 POST /api/subscription/request/{subscription_request_id}/reject
router.post('/request/:subscription_request_id/reject', subscriptionController.getListenerSubscription);

//     Delete subscription request                 DELETE /api/subscription/request/{subscription_request_id}
router.delete('/request/:subscription_request_id', subscriptionController.getListenerSubscription);

module.exports = router;