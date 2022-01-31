const express = require('express');

const { register, 
        login, 
        getMe, 
        forgotPassword, 
        resetPassword, 
        updateDetails,
        updatePassword
    } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');
const { update } = require('../models/User');

router
    .route('/register')
    .post(register);

router
    .route('/login')
    .post(login);

router
    .route('/Me')
    .get(protect, getMe);

router
    .route('/updatedetails')
    .put(protect, updateDetails);

router
    .route('/updatepassword')
    .put(protect, updatePassword);

router
    .route('/forgotpassword')
    .post(forgotPassword);

router
    .route('/resetpassword/:resettoken')
    .put(resetPassword);

module.exports = router;