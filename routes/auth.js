var express = require('express')
var router = express.Router()

const authController = require('../controllers/AuthController')

router.post('/login', authController.loginUser);

router.post('/admin/login', authController.loginAdmin);

module.exports = router
