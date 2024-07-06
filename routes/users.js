const express = require('express');
const router = express.Router();

const {userRegister,userLogin, logout} = require('../controller/user');

router.post("/register",userRegister)
router.post("/login",userLogin)
router.get("/logout",logout)


router.get('/api/users/check-session', (req, res) => {
    if (req.isAuthenticated()) { // Assuming you're using Passport.js
      res.send({ isValid: true });
    } else {
      res.send({ isValid: false });
    }
  });

module.exports = router;
