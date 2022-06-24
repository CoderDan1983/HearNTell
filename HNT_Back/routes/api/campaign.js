const express = require('express');
const router = express.Router();
const campaignController = require('../../controllers/campaignController.js');

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
//* CAMPAIGN Routes /api/campaign

// Create a campaign                           POST /api/campaign
router.route('/')
    .post(verifyRoles(ROLES_LIST.Advertiser), campaignController.create);

// Get list of all campaigns                   GET /api/campaign
router.route('/')
    .get(verifyRoles(ROLES_LIST.Advertiser), campaignController.index);

    // Get list of all campaigns for user                  GET /api/campaign/user
router.route('/')
.get(verifyRoles(ROLES_LIST.Advertiser), campaignController.userCampaigns);


// Get all an advertiser's Campaigns           GET /api/campaign/advertiser/{user_id}
router.route('/advertiser/:account_id')
    .get(verifyRoles(ROLES_LIST.Advertiser), campaignController.advertiserIndex);

// Get single campaign                         GET /api/campaign/{campaign_id}
router.route('/:campaign_id')
    .get(verifyRoles(ROLES_LIST.Advertiser), campaignController.show);

// Update a campaign                           POST /api/campaign/{campaign_id}
router.route('/:campaign_id')
    .post(verifyRoles(ROLES_LIST.Advertiser), campaignController.update);

// Delete a campaign                           DELETE /api/campaign/{campaign_id}
router.route('/:campaign_id')
    .delete(verifyRoles(ROLES_LIST.Advertiser), campaignController.remove);

// List of ad runs for a campaign              GET /api/campaign/{campaign_id}/ad_runs
router.route('/:campaign_id/ad_runs')
    .get(verifyRoles(ROLES_LIST.Advertiser), campaignController.adRunsPerCampaign);



module.exports = router;