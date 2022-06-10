const express = require('express');
const router = express.Router();
const subscriberController = require('../../controllers/subscriberController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

//* Get a single story
router.route('/listener/:sub_id')
    .get(verifyRoles(ROLES_LIST.Member), subscriberController.getListenerSubscription);
// router.get('/listener_subscriptions/:listener_id', subscriberController.getListenerSubscriptions);
//router.get('/listener/:sub_id', subscriberController.getListenerSubscription);

module.exports = router;