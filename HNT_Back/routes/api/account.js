const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/accountController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

//* ACCOUNT Routes /api/account

// Create an account                           POST /api/account
router.route('/')
  .post(verifyRoles(ROLES_LIST.Member), accountController.create);

// Get list of accounts                        GET /api/account
router.route('/')
  .get(verifyRoles(ROLES_LIST.Member), accountController.index);

// Get single account                          GET /api/account/{account_id}
router.route('/:account_id')
  .get(verifyRoles(ROLES_LIST.Member), accountController.show);

// Update an account                           POST /api/account/{account_id}
router.route('/:account_id')
  .post(verifyRoles(ROLES_LIST.Member), accountController.update);

// Delete an account                           DELETE /api/account/{account_id}
router.route('/:account_id')
  .delete(verifyRoles(ROLES_LIST.Member), accountController.remove);



module.exports = router;