const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController= require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/sign-in', usersController.signin);
router.get('/sign-up', usersController.signup);
router.post('/addUser', usersController.addUser);
//using passportjs as middleware
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in',
    }
    ),
usersController.createSession);
// router.post('/createSession', function(req, res, next) {
//     console.log(req.url);
//     passport.authenticate('local', function(err, user, info) {
//         console.log("authenticate");
//         console.log(err);
//         console.log(user);
//         console.log(info);
//     })(req, res, next);
// });

router.get('/sign-out', usersController.signout);

router.get('/rent', passport.checkAuthentication,usersController.rent);
router.post('/rent/add', passport.checkAuthentication,usersController.rentadd)

router.get('/borrow', passport.checkAuthentication,usersController.borrow);

router.get('/borrowal', passport.checkAuthentication,usersController.borrowal);

router.get('/validate', passport.checkAuthentication,usersController.validate);

module.exports = router;