const express = require('express');
const router = express.Router();
const adController = require('../../controllers/adController.js');



//* AD Routes /api/ad

// Create an ad                                POST /api/ad
router.post('/', adController.create);

// Get list of all ads                         GET /api/ad
router.get('/', adController.index);

// Update an ad                                POST /api/ad/{ad_id}
router.post('/:ad_id', adController.update);

// Delete an ad                                DELETE /api/ad/{ad_id}
router.delete('/:ad_id', adController.remove);



module.exports = router;