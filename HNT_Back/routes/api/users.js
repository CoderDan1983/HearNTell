const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);



// const express = require('express');
// const router = express.Router();
// const usersController = require('../../controllers/usersController');
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');
// console.log('running verifyRoles in users.js .')
// router.route('/')
//     .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
//     .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

// router.route('/:id')
//     .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

// module.exports = router;




// todo USER Routes /api/user

// //     Create a user                               POST /api/user
// router.post('/', usersController.create);

// //     Update a user                               POST /api/user/{user_id}
// router.post('/:user_id', usersController.update);

// //     Remove a user                               DELETE /api/user/{user_id}
// router.delete('/:user_id', usersController.create);


module.exports = router;