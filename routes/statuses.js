var express = require('express');
var router = express.Router();

const statusController = require('../controllers/StatusController');

router.get('/', statusController.getAllStatuses);

router.get('/:id', statusController.getStatus);

router.post('/', statusController.createStatus);

router.put('/:id', statusController.updateStatus);

router.put('/delete/:id', statusController.deleteStatus);

module.exports = router;
