const express = require('express');
const router = express.Router();
const subscriberController = require('../../controllers/subscriberController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

//* Get a single story
router.route('/listener/:sub_id') //! old route (?)
    .get(verifyRoles(ROLES_LIST.Member), subscriberController.getListenerSubscription);

module.exports = router;