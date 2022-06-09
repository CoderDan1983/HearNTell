const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController.js');

router.get('/listener_subscriptions/:listener_id', subscriberController.getListenerSubscriptions);

module.exports = router;