const express = require('express');
const router = express.Router();
const campaignController = require('../../controllers/campaignController.js');


//* CAMPAIGN Routes /api/campaign

// Create a campaign                           POST /api/campaign
router.post('/', campaignController.create);

// Get list of all campaigns                   GET /api/campaign
router.get('/', campaignController.index);

// Get all an advertiser's Campaigns           GET /api/campaign/advertiser/{user_id}
router.get('/advertiser/:user_id', campaignController.advertiserIndex);

// Get single campaign                         GET /api/campaign/{campaign_id}
router.get('/:campaign_id', campaignController.show);

// Update a campaign                           POST /api/campaign/{campaign_id}
router.post('/:campaign_id', campaignController.update);

// Delete a campaign                           DELETE /api/campaign/{campaign_id}
router.delete('/:campaign_id', campaignController.remove);

// List of ad runs for a campaign              GET /api/campaign/{campaign_id}/ad_runs
router.get('/:campaign_id/ad_runs', campaignController.adRunsPerCampaign);



module.exports = router;