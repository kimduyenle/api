var express = require('express');
var router = express.Router();

const roleController = require('../controllers/RoleController');

router.get('/', roleController.getAllRoles);

router.get('/:id', roleController.getRole);

module.exports = router;
