const express = require('express');
const router = express.Router();
const adController = require('../../controllers/adController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


//* AD Routes /api/ad

// Create an ad                                POST /api/ad
router.route('/')
  .post(verifyRoles(ROLES_LIST.Member), adController.create);

// Get list of all ads                         GET /api/ad
router.route('/')
  .get(verifyRoles(ROLES_LIST.Member), adController.index);

// Get single ad                        GET /api/ad/{ad_id}
router.route('/:ad_id')
  .get(verifyRoles(ROLES_LIST.Member), adController.show);

// Update an ad                                POST /api/ad/{ad_id}
router.route('/:ad_id')
  .post(verifyRoles(ROLES_LIST.Member), adController.update);

// Delete an ad                                DELETE /api/ad/{ad_id}
router.route('/:ad_id')
  .delete(verifyRoles(ROLES_LIST.Member), adController.remove);



module.exports = router;