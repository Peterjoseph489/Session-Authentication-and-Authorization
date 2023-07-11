const express = require('express');
const router = express.Router();
const { signUp, signIn, oneUser, isAuth } = require('../controllers/controller')

router.post('/user/sign-up', signUp)
router.post('/user/sign-in', signIn)
router.get('/user/:id', isAuth, oneUser)

module.exports = router;
