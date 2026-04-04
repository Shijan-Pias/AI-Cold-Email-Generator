const express = require('express');
const router = express.router();
const authController = require('../controller/authController');

router.post('/login',authController.login)

router.post('/register',authController.register)

router.post('/verify-otp',authController.verifyOTP)

module.exports = router;