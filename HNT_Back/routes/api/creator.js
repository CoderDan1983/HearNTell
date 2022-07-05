const express = require('express');
const router = express.Router();
const creatorController = require('../../controllers/creatorController.js');

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

// router.route('/profile/:profile_id')
//     .post(verifyRoles(ROLES_LIST.Member), creatorController.updateProfile); //! old routes leftover

//* CREATOR Routes /api/creator

// Create / update creator profile             POST /api/creator/{account_id}
// router.route('/:account_id')
router.route('/profile/')
    .post(verifyRoles(ROLES_LIST.Member), creatorController.saveProfile);

// Get creator profile                         GET /api/creator/{account_id}
// router.route('/:account_id')
router.route('/profile/:profile_id')
    .get(verifyRoles(ROLES_LIST.Member), creatorController.showProfile);

// Subscription requests                         GET /api/creator/{account_id}/subscription_requests
router.route('/:account_id/subscription_requests')
    .get(verifyRoles(ROLES_LIST.Member), creatorController.subscriptionRequests);

// Subscription requests approved                GET /api/creator/{account_id}/subscription_requests/approved
router.route('/:account_id/subscription_requests/approved')
    .get(verifyRoles(ROLES_LIST.Member), creatorController.subscriptionsApproved);

// Subscription requests pending                 GET /api/creator/{account_id}/subscription_requests/pending
router.route('/:account_id/subscription_requests/pending')
    .get(verifyRoles(ROLES_LIST.Member), creatorController.subscriptionsPending);

module.exports = router;