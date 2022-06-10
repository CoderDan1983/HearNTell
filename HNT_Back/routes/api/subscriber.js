const express = require('express');
const router = express.Router();
const subscriberController = require('../../controllers/subscriberController.js');

// router.get('/listener_subscriptions/:listener_id', subscriberController.getListenerSubscriptions);
router.get('/listener/:sub_id', subscriberController.getListenerSubscription);

module.exports = router;