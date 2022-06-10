const express = require('express');
const router = express.Router();
const queueController = require('../../controllers/queueController.js');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

//* Get a single "queue"
router.route('/:user_id')
    .get(verifyRoles(ROLES_LIST.Member), queueController.getQueue);
// router.get('/:user_id', queueController.getQueue);

module.exports = router;