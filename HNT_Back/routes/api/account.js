const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/accountController.js');


//* ACCOUNT Routes /api/account

// Create an account                           POST /api/account
router.post('/', accountController.create);

// Get list of accounts                        GET /api/account
router.get('/', accountController.index);

// Get single account                          GET /api/account/{account_id}
router.get('/:account_id', accountController.show);

// Update an account                           POST /api/account/{account_id}
router.post('/:account_id', accountController.update);

// Delete an account                           DELETE /api/account/{account_id}
router.delete('/:account_id', accountController.remove);



module.exports = router;