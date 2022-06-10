const express = require('express');
const router = express.Router();
const creatorController = require('../../controllers/creatorController.js');




//* CREATOR Routes /api/creator

// Create / update creator profile             POST /api/creator/{user_id}
router.post('/:user_id', creatorController.create);

// Get creator profile                         GET /api/creator/{user_id}
router.get('/:user_id', creatorController.creatorProfile);

// Subscriber requests                         GET /api/creator/{user_id}/subscription_requests
router.get('/:user_id/subscription_requests', creatorController.subscriptionRequests);

// Subscriber requests approved                GET /api/creator/{user_id}/subscription_requests/approved
router.get('/:user_id/subscription_requests/approved', creatorController.subscriptionsApproved);

// Subscriber requests pending                 GET /api/creator/{user_id}/subscription_requests/pending
router.get('/:user_id/subscription_requests/pending', creatorController.subscrptionsPending);



module.exports = router;