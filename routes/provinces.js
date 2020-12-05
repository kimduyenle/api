var express = require('express');
var router = express.Router();

const provinceController = require('../controllers/ProvinceController');

router.get('/', provinceController.getAllProvinces);

router.get('/districts', provinceController.getAllDistricts);

module.exports = router;
