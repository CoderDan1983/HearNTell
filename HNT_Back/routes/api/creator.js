const express = require('express');
const router = express.Router();
const creatorController = require('../../controllers/creatorController.js');




//* CREATOR Routes /api/creator

// Create / update creator profile             POST /api/creator/{account_id}
router.post('/:account_id', creatorController.create);

// Get creator profile                         GET /api/creator/{account_id}
router.get('/:account_id', creatorController.creatorProfile);

// Subscription requests                         GET /api/creator/{account_id}/subscription_requests
router.get('/:account_id/subscription_requests', creatorController.subscriptionRequests);

// Subscription requests approved                GET /api/creator/{account_id}/subscription_requests/approved
router.get('/:account_id/subscription_requests/approved', creatorController.subscriptionsApproved);

// Subscription requests pending                 GET /api/creator/{account_id}/subscription_requests/pending
router.get('/:account_id/subscription_requests/pending', creatorController.subscrptionsPending);



module.exports = router;